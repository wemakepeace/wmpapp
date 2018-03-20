const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
// const Class = require('../db/models/Class');

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

    Teacher.create(userData)
    .then(response => {
        console.log('result from creating user', response)
        res.send({user: response})
    })
    .catch(error => {
        console.log('error', error)
        res.status(500).send(error)
    })
});

module.exports = app;
