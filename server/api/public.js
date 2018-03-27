const app = require('express').Router();
const Teacher = require('../index').models.Teacher;
const Class = require('../index').models.Class;

const jwt = require('jsonwebtoken');
const { conn, models } = require('../index.js');


const extractSequelizeErrorMessages = (response) => {
    return response.errors.map(err => {
        return err.message
    });
}

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
                const token = jwt.sign(payload, 'foo');

                res.send({
                    feedback: {
                        type: 'success',
                        mesagges: ['ok']
                    }, token: token,
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

            // const feedback = {
            //     type: 'error',
            //     messages: errorMessages
            // };

            // [TODO] handle error feedback
            res.status(500).send({ feedback: { type: 'error', messages: errorMessages }})
        })
});

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    return models.Teacher.findOne({
        where: { email, password },
        include: models.Class
        })
        .then(session => {
            if( !session ){
                res.status(401).send({ feedback: "No  profile found." });
            }

            session = session.dataValues;

            if(session.password === req.body.password) {
                // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                const payload = { id: session.id };
                // foo is secret key, where should this come from ? .config ? ? ?
                const token = jwt.sign(payload, 'foo');

                res.json({feedback: { type: 'success', messages: ["ok"] } , token: token, session: session });
            } else {
                res.status(401).json({ feedback: { type: 'error', messages: ["Username or password is incorrect."] }});
            }
    })
     .catch(error => {
        // [TODO] handle error feedback
        res.status(500).send({ feedback: { type: 'error', messages: ["Internal server error. Please try logging in again."]  }});
    });
});

module.exports = app;
