const app = require('express').Router();
const { models } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const School = models.School;

// [TODO] should this route be in a different file??
// get one specific school address
app.get('/:schoolId', (req, res, next) => {
    const { schoolId } = req.params;
    return School.findOne({ where: { id: schoolId } })
        .then((school) => res.send(school.dataValues))
        .catch((error) => next(error))
});


// fetch school addresses based on teacherId
// [TODO] should this route be in a different file??
app.get('/teacher/:teacherId', (req, res, next) => {
    const { teacherId } = req.params;
    return Class.findAll({
        where: { teacherId },
        include: School
        })
        .then((classes) => {
            const schoolAddressOptions = [];
            let option = {};
            let schools = classes.map((current) => {
                return {
                    label : current.dataValues.school.dataValues.schoolName,
                    value: current.dataValues.school.dataValues.id
                }
            })

            schools.push({ label: 'New Address', value: 'newaddress' })
            res.send(schools)
        })
        .catch((error) => next(error));
});


module.exports = app;
