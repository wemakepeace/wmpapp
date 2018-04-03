const app = require('express').Router();
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');


app.get('/', (req, res, next) => {

    const id = req.user.id;

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

module.exports = app;


// return Teacher.findOne({
//         where: { email },
//         include: [ Class ]
//         })
//         .then(teacher => {
//             let errorMessage;
//             if (!teacher){
//                 errorMessage = ['No profile found.'];
//                 return res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
//             }

//             teacher = teacher.dataValues;
//             teacher.classes = teacher.classes.map(_class => {
//                 return {
//                     name: _class.dataValues.name,
//                     id: _class.dataValues.id
//                 }
//             });

//             const hashTest = pbkdf2(password, teacher.salt);

//             if (hashTest.passwordHash === teacher.password) {

//                 const token = createToken(teacher.id);

//                 res.send({
//                     feedback: feedback(SUCCESS, ["ok"]),
//                     token: token,
//                     teacher: extractDataForFrontend(teacher, {})
//                 });
//             }
//             else {
//                 errorMessage = ["Username or password is incorrect."];
//                 res.status(401).send({ feedback: feedback(ERROR, errorMessage) });
//             }
//     })
