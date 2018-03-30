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

module.exports = app;
