const app = require('express').Router();
const jwt = require('jsonwebtoken');
const { conn } = require('../index.js');
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;
const { success, error } = require('../constants/feedback_types');
const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');


app.post('/create', (req, res, next) => {
    let userData = req.body.data;

    /* uncomment for pw validations
    if(userData.password !== userData.confirmPassword) {
       return res.status(500).send({
            feedback: {
                type: 'error',
                messages: ['Your passwords are not matching.']
            }
        })
    } else if (!userData.password || userData.password.length < 8) {
       return res.status(500).send({
            feedback: {
                type: 'error',
                messages: ['Your password must be at least 8 characters.']
            }
        })
    }*/


    return Teacher.create(userData)
        .then(response => {
            return Class.create({ teacherId: response.dataValues.id })
            .then(classInstance => {
                // create session
                session = response.dataValues;
                // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                const payload = { id: session.id };
                const secret = process.env.SECRET;
                const token = jwt.sign(payload, secret, { expiresIn: '30m' });

                res.send({
                    feedback: feedback(success, ['ok']),
                    token: token,
                    session: {
                        ...response.dataValues,
                        classes: [{...classInstance.dataValues}]
                    }
                })
            })
        })
        .catch(error => {
            let errors;
            if (error.name = 'SequelizeUniqueConstraintError') {
                errorMessages = extractSequelizeErrorMessages(error);
            } else {
                errorMessages = ['Something went wrong when creating a user']
            }

            res.status(500).send({ feedback: feedback(error, errorMessages) })
        })
});

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    return Teacher.findOne({
        where: { email, password },
        include: Class
        })
        .then(session => {
            if( !session ){
                return res.status(401).send({ feedback: feedback(error, ['No  profile found.']) });
            }

            session = session.dataValues;

            if(session.password === req.body.password) {
                // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                const payload = { id: session.id };
                const secret = process.env.SECRET;
                const token = jwt.sign(payload, secret, { expiresIn: '30m' });

                res.send({
                    feedback: feedback(success, ["ok"]),
                    token: token,
                    session: session
                });
            }
            else {
                res.status(401).send({ feedback: feedback(error, ["Username or password is incorrect."]) });
            }
    })
     .catch(error => {
        // [TODO] handle error feedback
        res.status(500).send({ feedback: feedback(error, ["Internal server error. Please try logging in again."]) });
    });
});

module.exports = app;
