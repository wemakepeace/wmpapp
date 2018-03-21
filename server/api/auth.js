//routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const models = require('../index.js').models;
const app = express.Router();

app.post("/login", (req, res) => {
    if(req.body.email && req.body.password){
        var email = req.body.email;
        var password = req.body.password;
    }
    // usually this would be a database call:
    return models.Teacher.findOne({email, password})
        .then(user => {
            console.log('user', user)
            if( ! user ){
                res.status(401).json({message:"no such user found"});
            }
            user = user.dataValues;

            if(user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = {id: user.id};
            // foo is secret key, where should this come from ? .config ? ? ?
            var token = jwt.sign(payload, 'foo');
            res.json({message: "ok", token: token, user: user});
            } else {
                res.status(401).json({message:"passwords did not match"});
            }
    })
})

module.exports = app;





/* POST login. */

// app.post('/login', function (req, res, next) {

//     const user = req.body;

//     passport.authenticate('local', { session: false }, (err, user, feedback) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Something is not right',
//                 user   : user
//             });
//         }

//         req.login(user, { session: false }, (err) => {
//            if (err) {
//                res.send(err);
//            }
//            // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, 'your_jwt_secret');
//            return res.json({ user, token });
//         });
//     })(req, res);
// });
