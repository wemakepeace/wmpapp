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
            const age_groupFormatted = {
                label: _class.age_group.dataValues.name,
                value: _class.age_group.dataValues.id
            }
            _class.age_group = age_groupFormatted;
        }

        if (_class.term && _class.term.dataValues) {
            const termFormatted = {
                label: _class.term.dataValues.name,
                value: _class.term.dataValues.id
            }
            _class.term = termFormatted;
        }

        if (_class.school && _class.school.dataValues) {
            _class.school = _class.school.dataValues
        }

        res.send({
            feedback: feedback(SUCCESS, ['Class fetched.']),
            _class: extractDataForFrontend(_class, {})
        });
    })
    .catch(error =>{
        // [TODO] handle error
        console.log('error', error);
        const defaultError = 'Something went wrong when loading your session.';
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
    })
});

// create update class and school instances
app.post('/', (req, res, next) => {
    const data = req.body;
    const schoolData = data.school;

    if (data.age_group) {
        data.ageGroupId = data.age_group.value
    }

    if (data.term) {
        data.termId = data.term.value
    }

    if (schoolData && schoolData.country) {
        schoolData.country = schoolData.country.value;
    }

    Class.findById(data.id)
        .then(_class => {
            /** If class does not exist **/
            /** Create class, school and add schoolId to class **/

            if (!_class) {
                return Class.create(data)
                .then(_class => {
                    return School.create(schoolData)
                    .then(school => {
                        _class.setSchool(school.dataValues.id)
                        return _class
                    })
                })
            } else {
                const classPromise = () => {
                    for (var key in data) {
                        _class[key] = data[key];
                    }
                    return _class.save()
                }

                const schoolPromise = () => {
                    return _class.getSchool()
                    .then(school => {
                        for (var key in schoolData) {
                            school[key] = schoolData[key];
                        }

                        return school.save()
                    })
                 }

                return Promise.all([classPromise(), schoolPromise()])
                .then(([updatedClass, updatedSchool]) => updatedClass)
            }
        })
        .then(_class => {
            Promise.all([
                _class.getTerm(),
                _class.getAge_group(),
                _class.getSchool()
            ])
            .then(([term, age_group, school]) => {
                _class = _class.dataValues;

                if (term && term.dataValues) {
                    const termFormatted = {
                        label: term.dataValues.name,
                        value: term.dataValues.id
                    }
                    _class.term = termFormatted;
                }

                if (age_group && age_group.dataValues) {
                    const age_groupFormatted = {
                        label: age_group.dataValues.name,
                        value: age_group.dataValues.id
                    }
                    _class.age_group = age_groupFormatted;
                }

                if (school && school.dataValues) {
                    _class.school = school.dataValues;
                }

                res.send({
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    _class: extractDataForFrontend(_class, {})
                })
            })
        })
        .catch(error => {
            console.log('error', error)
            const defaultError = 'Something went wrong when saving your information.';
            const errorMessages = extractSequelizeErrorMessages(error, defaultError);

            res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
        })
});

module.exports = app;
