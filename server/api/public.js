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
    const { data } = req.body;
    const { password, confirmPassword } = data;
    const errorMessage = validatePassword(password, confirmPassword);

    if (errorMessage) {
        return next({ defaultError: errorMessage });
    }

    return Teacher.create(data)
        .then((teacher) => {

            teacher = teacher.dataValues;
            const token = createToken(teacher.id);

            res.send({
                feedback: feedback(SUCCESS, []),
                token: token,
                teacher: extractDataForFrontend(teacher, {})
            });
        })
        .catch((error) => {
            console.log('error in public api', error)
            console.log('error message', error.message)
            if (error.message) {
                error.defaultError = error.message;
            } else {
                error.defaultError = 'Something went wrong when creating a user.';
            }

            return next(error);
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
            let token, hashTest;
            let schoolIds = [];

            if (!teacher){
                return next({ defaultError: 'No profile found.' });
            }

            hashTest = pbkdf2(password, teacher.salt);

            if (hashTest.passwordHash !== teacher.password) {
                return next({ defaultError: 'Username or password is incorrect.' });
            }

            token = createToken(teacher.id);
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
                feedback: feedback(SUCCESS, []),
                token: token,
                teacher: extractDataForFrontend(teacher, {})
            });
    })
     .catch(error => {
        error.defaultError = 'Internal server error. Please try logging in again.';
        return next(error);
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
                    return next(error);
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

// Reset user password if resetPasswordToken is valid
app.post('/reset/:token', (req, res, next) => {
    const { password, confirmPassword } = req.body;
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
            return next(error);
        }

        const errorMessage = validatePassword(password, confirmPassword);
        if (errorMessage) {
            error.defaultError = errorMessage;
            return next(error);
        }

        user.password = password;
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
            return next(error);
        });
    });
});

module.exports = app;
