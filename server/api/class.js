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
        console.log(_class);
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

    if (data.age_group) data.ageGroupId = data.age_group.value;

    if (data.term) data.termId = data.term.value;

    if (schoolData && schoolData.country) schoolData.country = schoolData.country.value;

    Class.findById(data.id)
        .then(_class => {
            /** If class does not exist **/
            /** Create class, school and add schoolId to class **/

            // if (!_class) {
            //     return Class.create(data)
            //     .then(_class => {
            //         /* If there is no schoolData.id, create a new school instance*/
            //         if (schoolData.id === null) {
            //             return School.create(schoolData)
            //             .then(school => {
            //                 _class.setSchool(school.dataValues.id)
            //                 return _class
            //             })
            //         } else {
            //             School.findById(schoolData.id)
            //             .then(_school => {
            //                 schoolData.id = _school.id;
            //                 for (var key in schoolData) {
            //                     school[key] = schoolData[key];
            //                 }
            //                 return _school.save()
            //             })
            //         }

            //     })
            // } else {

            const classPromise = () => {
                /* Create classInstance if class does not exist yet */
                if (!_class) {
                    return Class.create(data)
                        .then(_class => _class)
                /* Update existing class */
                } else {

                    if (_class.schoolId !== schoolData.id) {
                        _class.schoolId = schoolData.id;
                    }

                    for (var key in data) {
                        _class[key] = data[key];
                    }
                }

                return _class.save()
            }


            const schoolPromise = () => {
                console.log('BEING CALLED============')
                return School.findById(_class.id)
                .then(school => {
                    /* Create schoolInstance if school does not exist */
                    if (schoolData.id === null) {
                        return School.create(schoolData)
                        .then(schoolInstance => {
                            _class.setSchool(schoolInstance.dataValues.id)
                            return schoolInstance
                        })
                        .catch(err => console.log(err))


                    /* Update current school */
                    } else if (schoolData.id === school.id) {
                        for (var key in schoolData) {
                            school[key] = schoolData[key];
                        }

                        return school.save()

                    /* Update other school */
                    } else {
                        return School.findById(schoolData.id)
                        .then(_school => {
                            schoolData.id = _school.id;
                            for (var key in schoolData) {
                                _school[key] = schoolData[key];
                            }

                            return _school.save()
                        })
                        .then(school => school)
                        .catch(err => console.log(err))
                    }
                })
                .then(res => {
                    console.log('res===========', res)
                    return res
                })
            }

            return Promise.all([classPromise(), schoolPromise()])
            .then(([updatedClass, updatedSchool]) => {
                console.log('updatedSchool', updatedSchool)
                return { updatedClass, updatedSchool }
            })
        })
        .then(({ updatedClass, updatedSchool})  => {
            console.log('updatedClass', updatedClass)
            console.log('updatedSchool', updatedSchool)
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



module.exports = app;
