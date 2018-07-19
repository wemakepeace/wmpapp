const app = require('express').Router();
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const Term = require('../db/index').models.Term;
const School = require('../db/index').models.School;
const Exchange = require('../db/index').models.Exchange;
const Teacher = require('../db/index').models.Teacher;
const conn = require('../db/conn');
const { feedback, sendError } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

app.get('/', (req, res, next) => {
    Class.findAll()
        .then(result => res.send(result))
});

app.get('/:id', (req, res, next) => {
    const classId = req.params.id;
    const associations = [ AgeGroup, Term, School ];

    return Promise.all([
        Class.getClassWithAssociations(classId, associations),
        Exchange.getExchangeAndExchangingClass(classId)
    ])
        .then(([ _class, exchange ]) => {
            // fetches Exchange and the exchanging class if any based on classId
            res.send({
                feedback: feedback(SUCCESS, ['Class fetched.']),
                exchange,
                _class
            });
        })
        .catch(error => next(error));
});


// create update class and school instances
app.post('/', (req, res, next) => {
    const classData = req.body;
    const schoolData = classData.school;
    // validate that association data is included (cannot be done in model definition)
    if (!classData.term) {
        return sendError(400, null, 'You must fill out term for the class.', res);
    }

    if (!classData.age_group) {
        return sendError(400, null, 'You must fill out age group for the class.', res);
    }

    if (!schoolData) {
        return sendError(400, null, 'You must fill out school address for the class.', res);
    }

    /* Update or create class and school */
    return Promise.all([
        Class.createOrUpdate(classData),
        School.createOrUpdate(schoolData)
    ])
    .then(([ updatedClass, updatedSchool ]) => {
        updatedClass.setSchool(updatedSchool.dataValues.id);
        return updatedClass.getClassWithAssociations()
            .then((_class) => {
                res.send({
                    feedback: feedback(SUCCESS, [ 'Your information has been saved.' ]),
                    _class
                });
            })
    })
    .catch(error => next(error))
});


module.exports = app;
