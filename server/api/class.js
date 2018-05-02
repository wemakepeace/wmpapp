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
    const classData = req.body;
    const schoolData = classData.school;

    if (classData.age_group) classData.ageGroupId = classData.age_group.value;

    if (classData.term) classData.termId = classData.term.value;

    if (schoolData && schoolData.country) schoolData.country = schoolData.country.value;

    Class.findById(classData.id)
        .then(_class => {

            const classPromise = () => {
                /* Create classInstance if class does not exist yet */
                console.log('_class', _class)
                if (!_class) {
                    let classDataWithoutId = {}
                    for (var key in classData) {
                        if (key !== 'id') {
                            classDataWithoutId[key] = classData[key]
                        }
                    }
                    return Class.create(classDataWithoutId)
                        .then(_class => _class)
                /* Update existing class */
                } else {

                    if (_class.schoolId !== schoolData.id) {
                        _class.schoolId = schoolData.id;
                    }

                    for (var key in classData) {
                        _class[key] = classData[key];
                    }
                }

                return _class.save()
            }


            const schoolPromise = () => {

                if (schoolData.id === null) {
                    return createSchool(schoolData)
                } else {
                    return School.findById(schoolData.id)
                    .then(school => {
                        /* Create schoolInstance if school does not exist */
                        /* Update current school */
                        if (school) {
                            for (var key in schoolData) {
                                school[key] = schoolData[key];
                            }

                            return school.save()

                        }
                    })
                    .then(res => res)
                    .catch(err => console.log(err))
                }
            }

            /* Update or create class and school */
            return Promise.all([classPromise(), schoolPromise()])

            .then(([updatedClass, updatedSchool]) => {
                return { updatedClass, updatedSchool }
            })
        })
        .then(({ updatedClass, updatedSchool})  => {

            updatedClass.setSchool(updatedSchool.dataValues.id);

            return Promise.all([
                updatedClass.getTerm(),
                updatedClass.getAge_group(),
                updatedClass.getSchool()
            ])
            .then(([term, age_group, school]) => {
                updatedClass = updatedClass.dataValues;
                updatedSchool = updatedSchool.dataValues;

                if (term && term.dataValues) {
                    const termFormatted = {
                        label: term.dataValues.name,
                        value: term.dataValues.id
                    }

                    updatedClass.term = termFormatted;
                }

                if (age_group && age_group.dataValues) {
                    const age_groupFormatted = {
                        label: age_group.dataValues.name,
                        value: age_group.dataValues.id
                    }

                    updatedClass.age_group = age_groupFormatted;
                }

                if (updatedSchool ) {
                    updatedClass.school = updatedSchool;
                }

                res.send({
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    _class: extractDataForFrontend(updatedClass, {}),
                    _school: extractDataForFrontend(updatedSchool, {})
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


/* Update or Create helper methods */

const createSchool = (data) => {
    return School.create(data)
        .then(school => {
            return school
        })
        .catch(err => console.log(err))
}



module.exports = app;
