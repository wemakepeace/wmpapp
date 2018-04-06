const app = require('express').Router();
const School = require('../db/index').models.School;
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const { extractDataForFrontend } = require('../utils/helpers');
const { feedback } = require('../utils/feedback');

app.put('/', (req, res) => {
    const { id } = req.body.data;
    const { data } = req.body;

    console.log('id', id)
    School.findOne({ id })
    .then(school => {

        for (var key in data) {
            school[key] = data[key]
        }

        school.save()
        .then(updatedSchool => {

            res.send({
                feedback: feedback(SUCCESS, ['Your information has been saved.']),
                updatedSchool: extractDataForFrontend(updatedSchool.dataValues, {})
            })

        })
    })
})

module.exports = app;
