const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const conn = require('../conn');

app.get('/', (req, res, next) => {
    Teacher.findAll()
        .then(result => res.send(result))
});


app.put('/:id', (req, res, next) => {
    Teacher.findOne({id})
    .then(teacher => console.log('teacher', teacher))
})


module.exports = app;
