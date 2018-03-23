const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const conn = require('../conn');

app.get('/', (req, res, next) => {
    Class.findAll()
        .then(result => {
            console.log('result', result)
            res.send(result)
        })
});

app.get('/:token', (req, res, next) => {
    console.log('req.user', req.user)

    req.user.getClasses()
    .then(data => {
        const classes = data.map(_class => _class.dataValues);
        res.send({...req.user.dataValues, classes: classes})
    })
});

module.exports = app;
