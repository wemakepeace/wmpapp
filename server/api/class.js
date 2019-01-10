const app = require('express').Router();
const { models, conn } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const School = models.School;
const AgeGroup = models.AgeGroup;
const Term = models.Term;
const Exchange = models.Exchange;
const { feedback } = require('../utils/feedback');
const { getMaterialsAWS } = require('../utils/aws/helpers');
const { SUCCESS } = require('../constants/feedbackTypes');


app.get('/', (req, res, next) => {
    Class.findAll()
        .then(result => res.send(result))
});


app.get('/:id', (req, res, next) => {
    const classId = req.params.id;
    const associations = [ AgeGroup, Term, School ];

    // Fetches Exchange and the match class if any, based on classId
    return Promise.all([
        Class.getClassWithAssociations(classId, associations),
        Exchange.getExchangeAndMatchClass(classId)
    ])
        .then(([ _class, exchange ]) => {
            return getMaterialsAWS(exchange.classRole)
                .then(materials => {
                    exchange.materials = materials;
                    res.send({
                        feedback: feedback(SUCCESS, []),
                        exchange,
                        _class
                    });
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
});


// Create update class and school instances
app.post('/', (req, res, next) => {
    const { classData, schoolData } = req.body;
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
        return next(error);
    }

    // Update or create class / school
    // Transaction to ensure rollback if any action fails
    return conn.transaction((t) => {
        return Promise.all([
            Class.createOrUpdate(classData, t),
            School.createOrUpdate(schoolData, t)
        ])
        .then(([ updatedClass, updatedSchool ]) => {
            const { id } = updatedSchool.dataValues;
            return updatedClass.setSchool(id, { transaction: t })
                .then(() => {
                    return updatedClass.getClassWithAssociations(t)
                        .then((_class) => {
                            res.send({
                                feedback: feedback(SUCCESS, [ 'Your information has been saved.' ]),
                                _class
                            });
                        })
                        .catch((error) => next(error));
                })
        })
    })
    .catch((error) => next(error));
});


module.exports = app;
