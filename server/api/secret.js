const express = require('express');
const app = express.Router();
const passport = require('passport');

app.get('/test', (req, res, next) => {
    res.send({authorized: true})
});

module.exports = app;
