const app = require('express').Router();
const jwt = require('jsonwebtoken');
const async = require('async');
const crypto = require('crypto');

const { conn } = require('../db/index.js');
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const School = require('../db/index').models.School;
const AgeGroup = require('../db/index').models.AgeGroup;


const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const { feedback, sendError } = require('../utils/feedback');
const { extractSessionData, extractDataForFrontend } = require('../utils/helpers');
const { sendEmail, smtpTransport } = require('../utils/smpt');
const {
    pbkdf2,
    saltHashPassword,
    createToken,
    validatePassword } = require('../utils/security');

app.post('/create', (req, res, next) => {
    let userData = req.body.data;
    const { password, confirmPassword } = userData;

    /*** UNCOMMENT for validations
    let errorMessage = validatePassword(password, confirmPassword);

    if (errorMessage) {
        return res.status(500).send({
            feedback: feedback(ERROR, errorMessage)
        });
    }
    ***/

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

            const defaultError = 'Something went wrong when creating a user.'

            sendError(500, error, defaultError, res);
        })
});

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    return Teacher.findOne({
        where: { email },
        include: [ {
                model: Class,
                include: [ School ]
            }]
        })
        .then(teacher => {
            let defaultError;
            if (!teacher){
                errorMessage = ['No profile found.'];
                return res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
            }

            teacher.destroyTokens();
            teacher = teacher.dataValues;
            teacher.schools = [];

            let schoolIds = [];

            teacher.classes = teacher.classes.map(_class => {

                const schoolId = _class.school.dataValues.id || null;

                if (schoolIds.indexOf(schoolId) < 0) {
                    schoolIds.push(schoolId);
                    teacher.schools.push(_class.school.dataValues);
                }

                return {
                    label: _class.dataValues.name,
                    value: _class.dataValues.id
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
                defaultError = "Username or password is incorrect.";
                sendError(401, null, defaultError, res);
                // res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
            }
    })
     .catch(error => {
        const defaultError = 'Internal server error. Please try logging in again.';
        sendError(500, error, defaultError, res)
    });
});

/*** Reset Password API ***/

app.post('/resetrequest', (req, res, next) => {
    const { email } = req.body;

    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(error, buf) {
                const token = buf.toString('hex');
                done(error, token);
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
                .catch(error => {
                    const defaultError = 'Something went wrong. Please try submitting your email again.';
                    sendError(500, error, defaultError, res);
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

                    const defaultError = 'Something went wrong. Please try again.';
                    sendError(500, null, defaultError, res);

                 } else {

                    const defaultMessage = ['An e-mail has been sent to ' + user.email + ' with further instructions.'];

                    res.send({
                        feedback: feedback(SUCCESS, defaultMessage)
                    })
                }
                done(error, 'done');
            });
        }],
        function(error) {
            if (error) {
                return next(error);
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
            let defaultError = 'The reset password link has expired.';
            sendError(401, null, defaultError, res);
        }

        /** Uncomment for validations
        let errorMessage = validatePassword(password, confirmPassword);

        if (errorMessage) {
            return res.status(500).send({
                feedback: feedback(ERROR, errorMessage)
            });
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

            const defaultError = 'Internal server error. Please try resetting your password  again.';
            sendError(500, error, defaultError, res);
        });
    })
})

module.exports = app;
