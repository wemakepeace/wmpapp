const express = require('express');
const app = express.Router();
const passport = require('passport');

app.get('/', (req, res, next) => {
    console.log('auth getting called at all? ')
    res.send({auth: true})
});

module.exports = app;
