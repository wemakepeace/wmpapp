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
    .catch(error => {
        const defaultError = 'Something went wrong when loading your session. Please login again.';
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).såend({ feedback: feedback(ERROR, errorMessages) })
    })
});

app.put('/teacher', (req, res, next) => {
    const data = req.body;
    const { id } = data;

    Teacher.findOne({
        where: { id },
        include: Class
    })
    .then(teacher => {

        teacher.firstName = data.firstName;
        teacher.lastName = data.lastName;
        teacher.email = data.email;
        teacher.phone = data.phone;
        // needs to handle password update...
        teacher.password = data.password;

        teacher.save()
            .then(updatedTeacher => {
                res.send({
                    feedback: feedback(SUCCESS, ['Teacher info updated.']),
                    session: {...updatedTeacher.dataValues }
                })
            })
            .catch(error => {
                const defaultError = ['Something went wrong when updating your profile.']
                const errorMessages = extractSequelizeErrorMessages(error, defaultError);

                res.status(500).send({ feedback: feedback(ERROR, errorMessages) })
            })
    })
    .catch(error => {
        // [TODO] make sure that the errors go through
        const defaultError = ['Something went wrong when updating your profile.']
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) })
    })
});

module.exports = app;
