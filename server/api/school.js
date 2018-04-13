const app = require('express').Router();
const School = require('../db/index').models.School;
const Class = require('../db/index').models.Class;
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const { extractDataForFrontend } = require('../utils/helpers');
const { feedback } = require('../utils/feedback');

app.post('/', (req, res) => {
    const { id } = req.body.data;
    const { data } = req.body;

    School.findById(id)
    .then(school => {

        if (school) {

            for (var key in data) {
                school[key] = data[key]
            }

            return school.save()
        } else {
            return School.create(data)
        }
    })
    .then(schoolInstance => {
        /** Set schoolId to class instance **/
        Class.findById(data.classId)
        .then(_class => {
            if (_class) {
                 _class.setSchool(schoolInstance)
            }
        })
        .then(() => {
            res.send({
                feedback: feedback(SUCCESS, ['Your information has been saved.']),
                updatedSchool: extractDataForFrontend(schoolInstance.dataValues, {})
            })
        })
    })
    // [TODO] handle error
    .catch(error => console.log('error', error))
})

module.exports = app;
