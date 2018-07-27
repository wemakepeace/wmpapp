const app = require('express').Router();
const AgeGroup = require('../db/models/AgeGroup');
const Term = require('../db/models/Term');
const { extractDataForFrontend } = require('../utils/helpers');
const { sendError } = require('../utils/feedback');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const countries = require('country-list');

// Fetch agegroups and format for FE
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
            const defaultError = 'Something went wrong when fetching data. Please refresh.'
            sendError(500, null, defaultError, res);
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
            const defaultError = 'Something went wrong when fetching data. Please refresh.'
            sendError(500, null, defaultError, res);
        });
});

app.get('/countries', (req, res, next) => {
    return new Promise((resolve, reject) => {
        const list = countries().getData();
        const options = list.map(({ name, code }) => {
            return {
                label: name,
                value: code
            }
        });

        options.length ? resolve(options) : reject();
    })
    .then(options => res.send(options));
});


const { getFileFromAWS } = require('../utils/aws/helpers');

app.get('/letter_templates', (req, res, next) => {
    const { number } = req.params;
    const letters = ['WMP_letter_1.pdf', 'WMP_letter_2.pdf', 'WMP_letter_3.pdf'];
    const folder = 'letter_templates';
    // console.log('getFileFromAWS', getFileFromAWS)
    return Promise.all(letters.map((letter) => getFileFromAWS(letter, folder)))
           .then(([ letter1, letter2, letter3 ]) => {
                res.send({ letterURLs: [ letter1, letter2, letter3 ] })
           })
    // return getFileFromAWS(file, folder)
    // .then((link) => {
    //     res.send({ letterURLs: [] )
    // })
});

module.exports = app;



