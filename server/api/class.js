const app = require('express').Router();
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const Term = require('../db/index').models.Term;
const School = require('../db/index').models.School;

const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');


app.get('/', (req, res, next) => {
    Class.findAll()
        .then(result => res.send(result))
});


app.get('/:id', (req, res, next) => {
    const { id } = req.params;

    Class.findOne({
        where: { id },
        include: [ AgeGroup, Term, School ]
    })
    .then(result => {
        result = result.dataValues;
        if (result.age_group && result.age_group.dataValues) {
            result.age_group = result.age_group.dataValues;
        }
        if (result.school && result.school.dataValues) {
            result.school = result.school.dataValues
        }
        if (result.term && result.term.dataValues) {
            result.term = result.term.dataValues;
        }

        res.send({
            feedback: feedback(SUCCESS, ['Class fetched.']),
            _class: extractDataForFrontend(result, {})
        });
    })
    .catch(error =>{
        // [TODO] handle error
        console.log(error);
    })
});

app.put('/', (req, res, next) => {
    const data = req.body;
    const { id } = data;

    Class.findOne({
        where: { id },
        include: [ AgeGroup, Term, School ]
    })
    .then(_class => {
        if (data.age_group.value !== _class.ageGroupId) {
            // update ageGroupId on class instance
            data.ageGroupId = data.age_group.value;
        }
        if (data.term.value !== _class.termId) {
            // update termId on class instance
            data.termId = data.term.value;
        }

        for(var key in data) {
            _class[key] = data[key];
        }

        _class.save()
        .then(result => {
                result = result.dataValues;
                if (result.age_group && result.age_group.dataValues) {
                    result.age_group = result.age_group.dataValues;
                }
                if (result.school && result.school.dataValues) {
                    result.school = result.school.dataValues
                }
                if (result.term && result.term.dataValues) {
                    result.term = result.term.dataValues;
                }

                res.send({
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    updatedClass: extractDataForFrontend(result, {})
                })
            })
            .catch(error => {
                console.log('error', error)
                const defaultError = ['Something went wrong when updating your profile.'];
                const errorMessages = extractSequelizeErrorMessages(error, defaultError);

                res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
            })
    })
    .catch(error => {
        // [TODO] make sure that the errors go through
        console.log('error', error)
        const defaultError = ['Something went wrong when updating your profile.']
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
    })
});

module.exports = app;
