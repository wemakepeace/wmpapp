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
        const { id } = _class.dataValues;

        Exchange.findOne({
            where: {
                $or: [{ classAId: id }, { classBId: id }]
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
            let classRole, exchangeData;
            let classData = _class.dataValues;

            if (classData.school && classData.school.dataValues) {
                classData.school = classData.school.dataValues;
            }

            if (exchange) {
                classRole = exchange.getClassRole(_class.id);
                exchangeData = formatData(exchange);
            }

            if (classData.age_group) {
                classData.age_group = classData.age_group.formatForSelect();
            }

            if (classData.term) {
                classData.term = classData.term.formatForSelect();
            }

            res.send({
                feedback: feedback(SUCCESS, ['Class fetched.']),
                _class: extractDataForFrontend(classData, {}),
                exchange: extractDataForFrontend(exchangeData, {}),
                classRole
            });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
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
            return Class.create(classData);
        } else {
            return Class.findById(classData.id)
            .then(_class => updateClass(_class, classData, schoolData));
        }
    };

    const schoolPromise = () => {
        if (schoolData.id === null) {
            return School.create(schoolData);
        } else {
            return School.findById(schoolData.id)
            .then(school => updateSchool(school, schoolData));
        }
    };

    /* Update or create class and school */
    return Promise.all([classPromise(), schoolPromise()])
    .then(([ updatedClass, updatedSchool ]) => {

        // should this be part of Promise chain?
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
                updatedClass.term = term.formatForSelect();
            }

            if (age_group && age_group.dataValues) {
                updatedClass.age_group = age_group.formatForSelect();
            }

            if (updatedSchool ) {
                updatedClass.school = updatedSchool;
            }

            res.send({
                feedback: feedback(SUCCESS, ['Your information has been saved.']),
                _class: extractDataForFrontend(updatedClass, {}),
                school: extractDataForFrontend(updatedSchool, {})
            });
        });
    })
    .catch(error => next(error))
});


/* Update or Create helper methods */

const updateSchool = (school, schoolData) => {
    for (var key in schoolData) {
        school[key] = schoolData[key];
    }

    return school.save();
};

const updateClass = (_class, classData, schoolData) => {
    if (_class.schoolId !== schoolData.id) {
        _class.schoolId = schoolData.id;
    }

    for (var key in classData) {
        _class[key] = classData[key];
    }

    return _class.save()
}

 // Helper function to extract data from exchange instance

const formatData = (data) => {
    const exchange = data.dataValues;

    if (exchange.classA) {
        exchange.classA = exchange.classA.dataValues;
        exchange.classA.term = exchange.classA.term;
        exchange.classA.school = exchange.classA.school.dataValues;
        exchange.classA.teacher = exchange.classA.teacher.dataValues;
    }
    if (exchange.classB) {
        exchange.classB = exchange.classB.dataValues
        exchange.classB.school = exchange.classB.school.dataValues;
        exchange.classB.teacher = exchange.classB.teacher.dataValues;
    }
    return exchange;
};


module.exports = app;
