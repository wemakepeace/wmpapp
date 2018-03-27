const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const conn = require('../conn');


app.get('/', (req, res, next) => {
    req.user.getClasses()
    .then(data => {
        const classes = data.map(_class => _class.dataValues);
        res.send({
            feedback: {
                type: 'success',
                messages: ['ok']
            },
            session: {...req.user.dataValues, classes: classes }
        })
    })
});

module.exports = app;
