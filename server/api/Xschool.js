const app = require('express').Router();
const School = require('../db/index').models.School;
const Class = require('../db/index').models.Class;
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const { extractDataForFrontend } = require('../utils/helpers');
const { extractSequelizeErrorMessages } = require('../utils/feedback');
const { feedback } = require('../utils/feedback');

app.post('/', (req, res) => {
    // const { id } = req.body.data;
    console.log('hitting here!!!!')

    const id = 1011;
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
    .catch(error =>{
        // [TODO] handle error
        console.log('error', error);
        const defaultError = 'Something went wrong when loading your session school.';
        const errorMessages = extractSequelizeErrorMessages(error, defaultError);

        res.status(500).send({ feedback: feedback(ERROR, errorMessages) });
    })
})

module.exports = app;
