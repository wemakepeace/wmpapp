const app = require('express').Router();
const { models } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const School = models.School;
const AgeGroup = models.AgeGroup;
const Term = models.Term;
const Exchange = models.Exchange;
const { feedback } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS } = require('../constants/feedbackTypes');


app.get('/', (req, res, next) => {
    Class.findAll()
        .then(result => res.send(result))
});


app.get('/:id', (req, res, next) => {
    const classId = req.params.id;
    const associations = [ AgeGroup, Term, School ];

    return Promise.all([
        Class.getClassWithAssociations(classId, associations),
        Exchange.getExchangeAndMatchClass(classId)
    ])
        .then(([ _class, exchange ]) => {
            // Fetches Exchange and the match class if any, based on classId
            res.send({
                feedback: feedback(SUCCESS, ['Class fetched.']),
                exchange,
                _class
            });
        })
        .catch(error => next(error));
});


// Create update class and school instances
app.post('/', (req, res, next) => {
    const classData = req.body;
    const schoolData = classData.school;
    let error = {};

    // Validate that associations are included (cannot be done in model definition)
    if (!classData.term) {
        error.defaultError = 'You must fill out term for the class.';
    }

    if (!classData.age_group) {
        error.defaultError = 'You must fill out age group for the class.';
    }

    if (!schoolData) {
        error.defaultError = 'You must fill out school address for the class.';
    }

    if (error && error.defaultError) {
        next(error);
    }

    // Update or create class / school
    return Promise.all([
        Class.createOrUpdate(classData),
        School.createOrUpdate(schoolData)
    ])
    .then(([ updatedClass, updatedSchool ]) => {
        const { id } = updatedSchool.dataValues;
        updatedClass.setSchool(id);
        return updatedClass.getClassWithAssociations()
            .then((_class) => {
                res.send({
                    feedback: feedback(SUCCESS, [ 'Your information has been saved.' ]),
                    _class
                });
            });
    })
    .catch(error => next(error));
});


module.exports = app;
