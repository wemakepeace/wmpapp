const app = require('express').Router();
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { pbkdf2, saltHashPassword, createToken, decodeToken } = require('../utils/security');
const { sendEmail, smtpTransport } = require('../utils/smpt');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

const jwt = require('jsonwebtoken');

app.get('/', (req, res, next) => {

    /* Have to verify that this is secure .... */
    const token = req.headers.authorization.split('Bearer ')[1];
    const id = decodeToken(token);

    return Teacher.findOne({
        where: { id },
        include: [ Class ]
        })
        .then(teacher => {
            let errorMessage;
            if (!teacher){
                errorMessage = ['No profile found.'];
                return res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
            }

            teacher = teacher.dataValues;
            teacher.classes = teacher.classes.map(_class => {
                return {
                    label: _class.dataValues.name,
                    value: _class.dataValues.id
                }
            });

            res.send({
                feedback: feedback(SUCCESS, ['Valid session loaded.']),
                teacher: extractDataForFrontend(teacher, {})
            })
        })
        .catch(error => {
            const defaultError = 'Something went wrong when loading your session. Please login.';
            const errorMessages = extractSequelizeErrorMessages(error, defaultError);

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
        })
});

app.put('/', (req, res, next) => {
    const data = req.body;
    const { id } = data;

    Teacher.findById(id)
    .then(user => {

        for (var key in data) {
            user[key] = data[key];
        }

        user.save()
            .then(updatedUser => {
                updatedUser =  updatedUser.dataValues;

                res.send({
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    teacher: extractDataForFrontend(updatedUser, {})
                })
            })
            .catch(error => {
                const defaultError = ['Something went wrong when updating your profile.'];
                const errorMessages = extractSequelizeErrorMessages(error, defaultError);

                res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
            })
    })
    .catch(error => {
        // [TODO] make sure that the errors go through
        const defaultError = ['Something went wrong when updating your profile.']
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
    })
});


const { validatePassword } = require('../utils/security');

app.put('/changepassword', (req, res, next) => {

    const { password, confirmPassword, oldPassword } = req.body;
    const token = req.headers.authorization.split('Bearer ')[1];
    const id = decodeToken(token);

    Teacher.findById(id)
        .then(user => {

            const hashTest = pbkdf2(oldPassword, user.salt);

            if (hashTest.passwordHash === user.password) {

                let errorMessage = validatePassword(password, confirmPassword);

                if (errorMessage) {
                    return res.status(500).send({
                        feedback: feedback(ERROR, errorMessage)
                    });
                }

                user.password = password;

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

            }
            else {
                errorMessage = ["Password is incorrect."];
                res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
            }
        })
});


app.post('/logout', (req, res, next) => {
    const { id } = req.body;
    Teacher.findById(id)
    .then(user => user.destroyTokens())
})


module.exports = app;
