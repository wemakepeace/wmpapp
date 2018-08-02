const app = require('express').Router();
const { models } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const School = models.School;
const { feedback } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { sendEmail, smtpTransport } = require('../utils/email/smtp');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const {
    pbkdf2,
    saltHashPassword,
    createToken,
    decodeToken,
    validatePassword
} = require('../utils/security');

app.get('/', (req, res, next) => {
    /* Have to verify that this is secure .... */
    const token = req.headers.authorization.split('Bearer ')[1];
    const id = decodeToken(token);

    return Teacher.getTeacherAndAssociations(id)
        .then((teacher) => {
            if (!teacher){
                const defaultError =  'No profile found.';
                return next({ defaultError });
            }
            res.send({
                feedback: feedback(SUCCESS, []),
                teacher
            });
        })
        .catch(error => {
            error.defaultError = 'Something went wrong when loading your session. Please login.';
            return next(error);
        });
});


app.put('/', (req, res, next) => {
    const data = req.body;
    const { id } = data;

    Teacher.findById(id)
    .then(user => {

        for (var key in data) {
            user[ key ] = data[ key ];
        }

        user.save()
            .then(updatedUser => {
                updatedUser = updatedUser.dataValues;
                res.send({
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    teacher: extractDataForFrontend(updatedUser, {})
                })
            })
            .catch(error => {
                error.defaultError = 'Something went wrong when updating your profile.';
                return next(error);
            })
    })
    .catch(error => {
        error.defaultError = 'Something went wrong when updating your profile.';
        return next(error);
    })
});


app.put('/changepassword', (req, res, next) => {
    const { password, confirmPassword, oldPassword } = req.body;
    const token = req.headers.authorization.split('Bearer ')[1];
    const id = decodeToken(token);

    if (!password || !confirmPassword || !oldPassword) {
        return next({ defaultError: 'You have to fill in all fields to change password.'})
    }

    Teacher.findById(id)
        .then(user => {
            const hashTest = pbkdf2(oldPassword, user.salt);

            if (hashTest.passwordHash === user.password) {
                const errorMessage = validatePassword(password, confirmPassword);

                if (errorMessage) {
                    return next({ defaultError: errorMessage });
                }

                user.password = password;

                user.save()
                .then((updatedUser) => {

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
                    error.defaultError = 'Internal server error. Please try resetting your password  again.';;
                    return next(error);
                });
            }
            else {
                const defaultError = "Password is incorrect.";
                return next({ defaultError });
            }
        });
});


app.post('/logout', (req, res, next) => {
    const { id } = req.body;
    Teacher.findById(id)
    .then(user => user.destroyTokens())
})


module.exports = app;
