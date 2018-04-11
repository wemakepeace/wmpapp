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
    .then(_class => {
        _class = _class.dataValues;
        if (_class.age_group && _class.age_group.dataValues) {
            _class.age_group = _class.age_group.dataValues;
        }
        if (_class.school && _class.school.dataValues) {
            _class.school = _class.school.dataValues
        }
        if (_class.term && _class.term.dataValues) {
            _class.term = _class.term.dataValues;
        }

        res.send({
            feedback: feedback(SUCCESS, ['Class fetched.']),
            _class: extractDataForFrontend(_class, {})
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

    Class.findById(id)
    .then(_class => {
        if (data.age_group && (data.age_group.value !== _class.ageGroupId)) {
            data.ageGroupId = data.age_group.value;
        }
        if (data.term && (data.term.value !== _class.termId)) {
            data.termId = data.term.value;
        }

        for(var key in data) {
            _class[key] = data[key];
        }

        _class.save()
        .then(updatedClass => {
                Promise.all([updatedClass.getTerm(), updatedClass.getAge_group(), updatedClass.getSchool()])
                .then(([term, age_group, school]) => {
                    updatedClass = updatedClass.dataValues;

                    if (term && term.dataValues) {
                        updatedClass.term = term.dataValues;
                    }

                    if (age_group && age_group.dataValues) {
                        updatedClass.age_group = age_group.dataValues;
                    }

                    if (school && school.dataValues) {
                        updatedClass.school = school.dataValues;
                    }

                    res.send({
                        feedback: feedback(SUCCESS, ['Your information has been saved.']),
                        updatedClass: extractDataForFrontend(updatedClass, {})
                    })
                })
                // [TODO] handle error
                .catch(error => console.log(error))
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
