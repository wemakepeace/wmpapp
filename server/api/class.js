const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const conn = require('../conn');

app.post('/create', (req, res, next) => {
    // console.log('req.body', req.body)
    // new class instance
    // new teacher instance
    let userData = req.body.data;

    // if(userData.password !== userData.confirmPassword) {
    //    return res.status(500).send({
    //         feedback: {
    //             type: 'error',
    //             messages: ['Your passwords are not matching.']
    //         }
    //     })
    // } else if (!userData.password || userData.password.length < 8) {
    //    return res.status(500).send({
    //         feedback: {
    //             type: 'error',
    //             messages: ['Your password must be at least 8 characters.']
    //         }
    //     })
    // }

    return conn.transaction((t) => {
        return Promise.all([
            Teacher.create(userData, { transaction: t})
        ])
        .then(response => {
            console.log('response[0]', response[0])
            // create new class
                Class.create({ teacherId: response[0].dataValues.id })
                .then(classInstance => {
                    res.send({ class: classInstance, teacher: response[0] })
                })
            })
    })
    .catch(error => {
        console.log('error', error)
        res.status(500).send(error)
    })
});

module.exports = app;
