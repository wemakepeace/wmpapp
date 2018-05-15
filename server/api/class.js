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

        return _class
    })
    .then(_class => {

        Exchange.findOne({
            where: {
                $or: [{ classAId: _class.id }, { classBId: _class.id }]
            },
            include: [
                {
                    model: Class,
                    as: 'classA',
                    include: [ School, Teacher ]
                },
                {
                    model: Class,
                    as: 'classB',
                    include: [ School, Teacher ]
                }]
        })
        .then(exchange => {

            let classRole, _exchange;

            if (exchange) {
                classRole = exchange.getClassRole(_class.id);
                _exchange = exchange.dataValues
                if (exchange.dataValues.classA) {
                    _exchange.classA = exchange.dataValues.classA.dataValues
                    _exchange.classA.school = exchange.dataValues.classA.school.dataValues;
                    _exchange.classA.teacher = exchange.dataValues.classA.teacher.dataValues;
                }
                if (exchange.dataValues.classB) {
                    _exchange.classB = exchange.dataValues.classB.dataValues
                    _exchange.classB.school = exchange.dataValues.classB.school.dataValues;
                    _exchange.classB.teacher = exchange.dataValues.classB.teacher.dataValues;
                }
            }

            res.send({
                feedback: feedback(SUCCESS, ['Class fetched.']),
                _class: extractDataForFrontend(_class, {}),
                exchange: extractDataForFrontend(_exchange, {}),
                classRole
            });
        })
    })
    .catch(error => {
        const defaultError = 'Something went wrong when loading your session.';
        return sendError(500, error, defaultError, res);
    })
});

// create update class and school instances
app.post('/', (req, res, next) => {
    const classData = req.body;
    const schoolData = classData.school;

    if (classData.age_group) classData.ageGroupId = classData.age_group.value;

    if (classData.term) classData.termId = classData.term.value;

    if (schoolData && schoolData.country) schoolData.country = schoolData.country.value;

    const classPromise = () => {
        if (classData.id === null) {
            return Class.create(classData)
        } else {
            return Class.findById(classData.id)
            .then(_class => updateClass(_class, classData, schoolData))
        }
    }

    const schoolPromise = () => {
        if (schoolData.id === null) {
            return School.create(schoolData)
        } else {
            return School.findById(schoolData.id)
            .then(school => updateSchool(school, schoolData))
        }
    }

    /* Update or create class and school */
    return Promise.all([classPromise(), schoolPromise()])
    .then(([updatedClass, updatedSchool]) => {

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
                school: extractDataForFrontend(updatedSchool, {})
            })
        })
    })
    .catch(error => {
        const defaultError = 'Something went wrong when saving your information.';
        return sendError(500, error, defaultError, res);
    })
});


/* Update or Create helper methods */

const updateSchool = (school, schoolData) => {

    for (var key in schoolData) {
        school[key] = schoolData[key];
    }

    return school.save()
}

const updateClass = (_class, classData, schoolData) => {
    if (_class.schoolId !== schoolData.id) {
        _class.schoolId = schoolData.id;
    }

    for (var key in classData) {
        _class[key] = classData[key];
    }

    return _class.save()
}


module.exports = app;
