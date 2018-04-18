const app = require('express').Router();
const jwt = require('jsonwebtoken');

const { conn } = require('../db/index.js');
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;

const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractSessionData, extractDataForFrontend } = require('../utils/helpers');
const { pbkdf2, saltHashPassword } = require('../utils/security');

const createToken = (id, classId) => {
    const secret = process.env.SECRET;
    const payload = { id: id };

    return jwt.sign(payload, secret, { expiresIn: '30m' });
}

app.post('/create', (req, res, next) => {
    let userData = req.body.data;

     /* uncomment for pw validations
    if(userData.password !== userData.confirmPassword) {
       return res.status(500).send({
            feedback: feedback(ERROR, ['Your passwords are not matching.'])
        });
    } else if (!userData.password || userData.password.length < 8) {
       return res.status(500).send({
            feedback: feedback(ERROR, ['Your password must be at least 8 characters long.'])
        });
    }*/

    return Teacher.create(userData)
        .then(teacher => {

            teacher = teacher.dataValues;
            const token = createToken(teacher.id);

            res.send({
                feedback: feedback(SUCCESS, ['ok']),
                token: token,
                teacher: extractDataForFrontend(teacher, {})
            })
        })
        .catch(error => {
            console.log('error', error)

            const defaultError = 'Something went wrong when creating a user.'
            const errorMessages = extractSequelizeErrorMessages(error, defaultError);

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) })
        })
});

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    return Teacher.findOne({
        where: { email },
        include: [ Class ]
        })
        .then(teacher => {
            let errorMessage;
            if (!teacher){
                errorMessage = ['No profile found.'];
                return res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
            }

            teacher.destroyTokens();
            teacher = teacher.dataValues;

            teacher.classes = teacher.classes.map(_class => {
                return {
                    name: _class.dataValues.name,
                    id: _class.dataValues.id
                }
            });

            const hashTest = pbkdf2(password, teacher.salt);

            if (hashTest.passwordHash === teacher.password) {

                const token = createToken(teacher.id);

                res.send({
                    feedback: feedback(SUCCESS, ["ok"]),
                    token: token,
                    teacher: extractDataForFrontend(teacher, {})
                });
            }
            else {
                errorMessage = ["Username or password is incorrect."];
                res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
            }
    })
     .catch(error => {
        console.log('error', error)

        const defaultError = 'Internal server error. Please try logging in again.';
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
    });
});

/*** Reset Password API ***/

const async = require('async');
const crypto = require('crypto');
const { sendEmail, smtpTransport } = require('../utils/smpt');


app.post('/resetrequest', (req, res, next) => {
    const { email } = req.body;

    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                const token = buf.toString('hex');
                done(err, token);
            })
        },
        function(token, done) {
            Teacher.findOne({
                where: {
                    email: email,
                }
            })
            .then(user => {
                if (!user) {
                    let defaultError = ['No user found for this e-mail address.'];

                    return res.status(401).send({ feedback: feedback(ERROR, defaultError)})
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;

                user.save()
                .then( res => {
                    done(null, token, res.dataValues)
                })
                .catch(err => {
                    let defaultError = ['Something went wrong. Please try submitting your email again.'];
                    return res.status(500).send({ feedback: feedback(ERROR, defaultError)})
                });
            });
        },
        function(token, user, done) {
            const mailOptionsRequestResetPw = {
                to: user.email,
                from: 'tempwmp@gmail.com',
                subject: 'Reset password  | We Make Peace',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/public/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptionsRequestResetPw, function(error, response) {
                if (error) {

                    const defaultError = ['Something went wrong. Please try again.'];

                    res.status(500).send({
                        feedback: feedback(ERROR, defaultError)
                    })

                 } else {

                    const defaultMessage = ['An e-mail has been sent to ' + user.email + ' with further instructions.'];

                    res.send({
                        feedback: feedback(SUCCESS, defaultMessage)
                    })
                }
                done(err, 'done');
            });
        }],
        function(err) {
            if (err) {
                console.log('error hitting down here', err);
                return next(err);
            }
            res.redirect('/')
        })
});


app.get('/reset/:token', (req, res, next) => {
    Teacher.findOne({
        where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        }
    })
    .then(user => {
        if (user) {
            return res.redirect(`/#/reset/${req.params.token}`)
        } else {
            return res.end(`<div style='width: 500px;margin:100 auto 0 auto;text-align:center'><h1>The reset password link is not valid.</h1><p>Please navigate to www.portal.wemakepeace.com/#/reset to try again.</p></div>`)
        }
    });
});


app.post('/reset/:token', (req, res, next) => {
    const { password1, password2 } = req.body;

    Teacher.findOne({
        where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        }
    })
    .then(user => {

        if (!user) {
            let defaultError = ['The reset password link has expired.'];

            return res.status(401).send({ feedback: feedback(ERROR, defaultError)})
        }

        /** Uncomment for validations
        if (password1 !== password2) {
            return res.status(500).send({
                feedback: feedback(ERROR, ['Your passwords are not matching.'])
            })
        }

        if (!password1 || password1.length < 8) {
            return res.status(500).send({
                feedback: feedback(ERROR, ['Your password must be at least 8 characters.'])
            })
        } **/

        user.password = password1;

        user.save()
        .then(updatedUser => {

            updatedUser.destroyTokens();

            const mailOptionsVerifyPwChange = {
                to : updatedUser.email,
                from: 'tempmywmp@gmail.com',
                firstName: updatedUser.firstName,
                subject : "Your password has been changed",
                html : "Hello " + updatedUser.firstName + ",<br> This is a confirmation that the password for your We Make Peace portal account " + updatedUser.email + " has been changed."
            }

            sendEmail(res, mailOptionsVerifyPwChange)

            res.send({
                user:updatedUser,
                feedback: feedback(SUCCESS, ['Your password has been reset.'])
            })
        })
        .catch(error => {
            console.log('error', error)

            const defaultError = ['Internal server error. Please try resetting your password  again.'];
            const errorMessages = extractSequelizeErrorMessages(error, defaultError);

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
        });
    })
})

module.exports = app;
