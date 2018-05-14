const app = require('express').Router();
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const School = require('../db/index').models.School;
const conn = require('../db/conn');

const { feedback, sendError } = require('../utils/feedback');
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
        include: [ {
                model: Class,
                include: [ School ]
            }]
        })
        .then(teacher => {
            if (!teacher){
                const defaultError = 'No profile found.';
                return sendError(401, null, defaultError, res);
            }

            teacher = teacher.dataValues;

            if (teacher.classes) {
                teacher.schools = [];

                let schoolIds = [];

                teacher.classes = teacher.classes.map(_class => {
                    _class = _class.dataValues;
                    const schoolId = !_class.school
                        ? null
                        : _class.school.dataValues.id;

                    if (schoolId && schoolIds.indexOf(schoolId) < 0) {
                        schoolIds.push(schoolId);
                        teacher.schools.push(_class.school.dataValues);
                    }

                    return {
                        label: _class.name,
                        value: _class.id
                    }
                });

            }

            res.send({
                feedback: feedback(SUCCESS, ['Valid session loaded.']),
                teacher: extractDataForFrontend(teacher, {})
            })
        })
        .catch(error => {

            const defaultError = 'Something went wrong when loading your session. Please login.';

            sendError(500, error, defaultError, res);

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
                const defaultError = 'Something went wrong when updating your profile.';

                sendError(500, error, defaultError, res);

            })
    })
    .catch(error => {
        const defaultError = 'Something went wrong when updating your profile.'
        sendError(500, error, defaultError, res);
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

                /*** UNCOMMENT for validations
                let errorMessage = validatePassword(password, confirmPassword);

                if (errorMessage) {
                    return res.status(500).send({
                        feedback: feedback(ERROR, errorMessage)
                    });
                }
                ***/

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

                    const defaultError = 'Internal server error. Please try resetting your password  again.';

                    return sendError(500, error, defaultError, res);

                });
            }
            else {
                const defaultError = "Password is incorrect.";
                sendError(401, null, defaultError, res);
            }
        })
});


app.post('/logout', (req, res, next) => {
    const { id } = req.body;
    Teacher.findById(id)
    .then(user => user.destroyTokens())
})


module.exports = app;
