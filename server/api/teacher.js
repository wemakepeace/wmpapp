const app = require('express').Router();
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
// const AgeGroup = require('../db/index').models.AgeGroup;
const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');


// app.get('/', (req, res, next) => {
//     Teacher.findAll()
//         .then(result => res.send(result))
// });


app.get('/', (req, res, next) => {

    const id = req.user.id;
    console.log('id', id)

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
                    name: _class.dataValues.name,
                    id: _class.dataValues.id
                }
            });

            res.send({
                feedback: feedback(SUCCESS, ['Valid session loaded.']),
                teacher: extractDataForFrontend(teacher, {})
            })
        })
        .catch(error => {
            const defaultError = 'Something went wrong when loading your session. Please login again.';
            const errorMessages = extractSequelizeErrorMessages(error, defaultError);

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
        })
});




app.put('/', (req, res, next) => {
    const data = req.body;
    const { id } = data;

    Teacher.findOne({ id })
    .then(teacher => {
        teacher.firstName = data.firstName;
        teacher.lastName = data.lastName;
        teacher.email = data.email;
        teacher.phone = data.phone;
        teacher.password = data.password;
        teacher.save()
            .then(updatedTeacher => {
                updatedTeacher =  updatedTeacher.dataValues;

                res.send({
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    teacher: extractDataForFrontend(updatedTeacher, {})
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
