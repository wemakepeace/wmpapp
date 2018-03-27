const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const conn = require('../conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { success, error } = require('../constants/feedback_types');


app.get('/', (req, res, next) => {
    req.user.getClasses()
    .then(data => {
        const classes = data.map(_class => _class.dataValues);
        res.send({
            feedback: feedback(success, ['Valid session loaded.']),
            session: {...req.user.dataValues, classes: classes }
        })
    })
    .catch(error => {
        console.log('error', error)
        let errors;
        if (error.name = 'SequelizeUniqueConstraintError') {
            errorMessages = extractSequelizeErrorMessages(error);
        } else {
            errorMessages = ['Something went wrong when loading your session. Please login again.']
        }

        res.status(500).send({ feedback: feedback(error, errorMessages) })
    })
});

module.exports = app;
