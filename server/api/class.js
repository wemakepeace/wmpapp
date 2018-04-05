const app = require('express').Router();
// const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const Term = require('../db/index').models.Term;

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
        include: [ AgeGroup, Term ]
    })
    .then(result => {
        console.log('result', result)
        _result = result.dataValues;
        _result.age_group = result.age_group.dataValues;
        _result.term = result.term.dataValues;

        res.send({
            feedback: feedback(SUCCESS, ['Class fetched.']),
            _class: extractDataForFrontend(_result, {})
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

    Class.findOne({ id })
    .then(_class => {
        if (data.age_group.value !== _class.ageGroupId) {
            // update ageGroupId on class instance
            data.ageGroupId = data.age_group.value;
        }

        for(var key in data) {
            _class[key] = data[key];
        }

        _class.save()
            .then(() => {
                Class.findOne({
                    where: { id },
                    include: [ AgeGroup ]
                })
                .then(updatedClass => {
                    updatedClass = updatedClass.dataValues;
                    updatedClass.age_group = updatedClass.age_group.dataValues;

                    res.send({
                        feedback: feedback(SUCCESS, ['Your information has been saved.']),
                        updatedClass: extractDataForFrontend(updatedClass, {})
                    })
                })
            })
            .catch(error => {
                const defaultError = ['Something went wrong when updating your profile.'];
                const errorMessages = extractSequelizeErrorMessages(error, defaultError);

                res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
            })
    })
    .catch(error => {
        // [TODO] make sure that the errors go through
        const defaultError = ['Something went wrong when updating your profile.']
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
    })
});

module.exports = app;
