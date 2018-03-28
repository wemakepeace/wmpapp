const app = require('express').Router();
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractSessionData } = require('../utils/session');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');


app.get('/', (req, res, next) => {
    console.log('req.user', req.user)
    return Teacher.findOne({
        where: { id: req.user.id },
        include: [
                {
                    model: Class,
                    include: [ AgeGroup ]
                }
            ]
        })
        .then(data => {
            console.log('data', data)
            // const classes = data.map(_class => _class.dataValues);
            const session = extractSessionData({...data.dataValues});
            res.send({
                feedback: feedback(SUCCESS, ['Valid session loaded.']),
                session: session
            })
        })
        .catch(error => {
            const defaultError = 'Something went wrong when loading your session. Please login again.';
            const errorMessages = extractSequelizeErrorMessages(error, defaultError);

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
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
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    session: extractSessionData({...updatedTeacher.dataValues})
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

module.exports = app;
