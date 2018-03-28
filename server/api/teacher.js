const app = require('express').Router();
const Teacher = require('../db/index').models.Teacher;
const Class = require('../db/index').models.Class;
const conn = require('../db/conn');

app.get('/', (req, res, next) => {
    Teacher.findAll()
        .then(result => res.send(result))
});


app.put('/:id', (req, res, next) => {
    Teacher.findOne({id})
    .then(teacher => console.log('teacher', teacher))
});


module.exports = app;
