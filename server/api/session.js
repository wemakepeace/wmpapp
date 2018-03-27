const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const conn = require('../conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { SUCCESS, ERROR } = require('../constants/feedback_types');


app.get('/', (req, res, next) => {
    req.user.getClasses()
    .then(data => {
        const classes = data.map(_class => _class.dataValues);
        res.send({
            feedback: feedback(SUCCESS, ['Valid session loaded.']),
            session: {...req.user.dataValues, classes: classes }
        })
    })
    .catch(response => {

        let errors;

        if (error.name = 'SequelizeUniqueConstraintError') {
            errorMessages = extractSequelizeErrorMessages(response);
        } else {
            errorMessages = ['Something went wrong when loading your session. Please login again.']
        }

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) })
    })
});

app.put('/teacher', (req, res, next) => {
    const data = req.body;
    const { id } = data;
    // console.log('data', data)
    // NB may want to only use the id here to find user in case user wants to change email
    // Id is the only value that will never change
    Teacher.findOne({
        where: { id },
        include: Class
    })
    .then(teacher => {

        teacher.firstName = data.firstName;
        teacher.lastName = data.lastName;
        teacher.email = data.email;
        teacher.phone = data.phone;
        teacher.password = data.password;

        teacher.save()
        .then(updatedTeacher => {
            res.send({
                feedback: feedback(SUCCESS, ['Teacher info updated.']),
                session: {...updatedTeacher.dataValues }
            })
        })
        .catch(response => {
            let errorMessages;

            if (response && response.name === 'SequelizeUniqueConstraintError') {
                errorMessages = extractSequelizeErrorMessages(response);
            } else {
                errorMessages = ['Something went wrong when updating your profile.']
            }

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) })
        })
    })
    .catch(response => {
        // [TODO] make sure that the errors go through
        let errorMessages;

        if (response && response.name === 'SequelizeUniqueConstraintError') {
            errorMessages = extractSequelizeErrorMessages(response);
        } else {
            errorMessages = ['Something went wrong when updating your profile.']
        }

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) })
    })
});

module.exports = app;
