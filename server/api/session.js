const app = require('express').Router();
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');


app.get('/', (req, res, next) => {

    const teacherId = req.user.id;
    const classId = req.user.class[0].id;


    return Teacher.findOne({
        where: { id: teacherId },
        include: [
                {
                    model: Class,
                    as: 'class',
                    where: { id: classId },
                    limit: 1,
                    include: [ AgeGroup ]
                }
            ]
        })
        .then(session => {
            session = session.dataValues;
            session.class = session.class[0].dataValues;
            session.class.age_group = session.class.age_group.dataValues;

            res.send({
                feedback: feedback(SUCCESS, ['Valid session loaded.']),
                session: extractDataForFrontend(session, {})
            })
        })
        .catch(error => {
            const defaultError = 'Something went wrong when loading your session. Please login again.';
            const errorMessages = extractSequelizeErrorMessages(error, defaultError);

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
        })
});

module.exports = app;
