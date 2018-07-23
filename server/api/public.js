const app = require('express').Router();
const async = require('async');
const crypto = require('crypto');
const { models } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const School = models.School;
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const { feedback } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { generateEmail } = require('../utils/email/auth');
const {
    pbkdf2,
    createToken,
    validatePassword } = require('../utils/security');


app.post('/create', (req, res, next) => {
    let { data } = req.body;
    let error = {};
    const { password, confirmPassword } = data;

    /* UNCOMMENT for validations
    let errorMessage = validatePassword(password, confirmPassword);

    if (errorMessage) {
        error.defaultError = errorMessage;
        next(error);
    }
    */

    return Teacher.create(data)
        .then((teacher) => {

            teacher = teacher.dataValues;
            const token = createToken(teacher.id);

            res.send({
                feedback: feedback(SUCCESS, ['ok']),
                token: token,
                teacher: extractDataForFrontend(teacher, {})
            });
        })
        .catch((error) => {
            error.defaultError = 'Something went wrong when creating a user.';
            next(error);
        });
});

app.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    return Teacher.findOne({
        where: { email },
        include: [ {
                model: Class,
                include: [ School ]
            }]
        })
        .then(teacher => {
            let defaultError, token, hashTest;
            let schoolIds = [];
            let error = {};

            if (!teacher){
                error.defaultError =  'No profile found.';
                next(error);
            }

            hashTest = pbkdf2(password, teacher.salt);

            if (hashTest.passwordHash !== teacher.password) {
                error.defaultError = 'Username or password is incorrect.';
                next(error);
            }

            token = createToken(teacher.id);
            teacher.destroyTokens();
            teacher = teacher.dataValues;
            teacher.schools = [];
            teacher.classes = teacher.classes.map(_class => {
                const schoolId = _class.school.dataValues.id || null;

                if (schoolIds.indexOf(schoolId) < 0) {
                    schoolIds.push(schoolId);
                    teacher.schools.push(_class.school.dataValues);
                }

                return { label: _class.dataValues.name, value: _class.dataValues.id }
            });

            res.send({
                feedback: feedback(SUCCESS, ["ok"]),
                token: token,
                teacher: extractDataForFrontend(teacher, {})
            });
    })
     .catch(error => {
        error.defaultError = 'Internal server error. Please try logging in again.';
        next(error);
    });
});

// Reset Password

app.post('/resetrequest', (req, res, next) => {
    const { email } = req.body;

    async.waterfall([
        function(done) {
            Teacher.findOne({
                where: {
                    email: email,
                }
            })
            .then(user => {
                if (!user) {
                    const error = {
                        defaultError: 'No user found for this e-mail address.'
                    };
                    return done(error)
                }
                done(null, user)
            })
        },
        function(user, done) {
            crypto.randomBytes(20, function(error, buf) {
                const token = buf.toString('hex');
                done(error, token, user);
            })
        },
        function(token, user, done) {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;

            user.save()
                .then(_user => done(null, token, _user.dataValues))
                .catch(error => {
                    const defaultError = 'Something went wrong. Please try submitting your email again.';
                    error.defaultError = defaultError;
                    next(error);
                });
        },
        function(token, user, done) {
            const link = `http://${req.headers.host}/public/reset/${token}`;
            const template = 'resetPassword';
            user.link = link;

            return generateEmail(res, user, template)
            .then(() => {

                const defaultMessage = [ 'An e-mail has been sent to ' + user.email + ' with further instructions.' ];

                res.send({
                    feedback: feedback(SUCCESS, defaultMessage)
                });
            })
            .catch(error => done(error))
        }],
        function(error) {
            if (error) return next(error);
            res.redirect('/')
        })
});


app.get('/reset/:token', (req, res, next) => {
    const { token } = req.params;

    Teacher.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        }
    })
    .then((user) => {
        if (user) {
            return res.redirect(`/#/reset/${token}`)
        } else {
            return res.end(`<div style='width: 500px;margin:100 auto 0 auto;text-align:center'><h1>The reset password link is expired.</h1><p>Please navigate to www.portal.wemakepeace.com/#/reset to try again.</p></div>`)
        }
    });
});


app.post('/reset/:token', (req, res, next) => {
    const { password1, password2 } = req.body;
    const { token } = req.params;

    return Teacher.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        }
    })
    .then((user) => {
        let error = {}

        if (!user) {
            error.defaultError = 'The reset password link has expired.';
            next(error);
        }

        /** Uncomment for validations
        const errorMessage = validatePassword(password, confirmPassword);

        if (errorMessage) {
            error.defaultError = errorMessage;
            next(error);
        } **/

        user.password = password1;
        user.save()
        .then(updatedUser => {
            updatedUser.destroyTokens();
            const { email } = updatedUser.dataValues;
            const template = 'passwordChanged';
            return generateEmail(res, updatedUser.dataValues, template)
            .then(result => {
                res.send({
                    user: updatedUser,
                    feedback: feedback(SUCCESS, [ 'Your password has been reset. We are redirecting you to your profile.' ])
                });
            })
            .catch(error => next(error));
        })
        .catch(error => {
            error.defaultError = 'Internal server error. Please try resetting your password  again.';
            next(error);
        });
    });
});

module.exports = app;
