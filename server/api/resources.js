const app = require('express').Router();
const AgeGroup = require('../db/models/AgeGroup');
const Term = require('../db/models/Term');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

/** fetch agegroups and format for FE **/
app.get('/agegroups', (req, res, next) => {
    return AgeGroup.findAll()
        .then(age_groups => {
            const data = age_groups.map(group => {
                return {
                    label: group.dataValues.name,
                    value: group.dataValues.id
                }
            })
            res.send(data);
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ feedback: feedback(ERROR, ['Something went wrong. Please refresh']) });
        });
});

app.get('/terms', (req, res, next) => {
    return Term.findAll()
        .then(terms => {
            const data = terms.map(term => {
                return {
                    label: term.dataValues.name,
                    value: term.dataValues.id
                }
            })
            res.send(data);
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ feedback: feedback(ERROR, ['Something went wrong. Please refresh']) });
        });
});
module.exports = app;



