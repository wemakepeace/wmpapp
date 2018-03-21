//routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const app = express.Router();
/* POST login. */

app.post('/login', function (req, res, next) {
    console.log('req.body', req.body)
    const user = req.body;
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('user in login!', user)
        console.log('info', info)
        console.log('err', err)
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }

        req.login(user, { session: false }, (err) => {
           if (err) {
              console.log('getting an error here')
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({ user, token });
        });
    })(req, res);
});

module.exports = app;
