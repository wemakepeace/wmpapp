require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const { seed, models } = require('./server/db/index.js');
const {  sendError } = require('./server/utils/feedback');
const publicRoutes = require('./server/api/public');
const teacherRoutes = require('./server/api/teacher');
const classRoutes = require('./server/api/class');
const resources = require('./server/api/resources');
const exchangeRoutes = require('./server/api/exchange');
const schoolRoutes = require('./server/api/school');
const port = process.env.PORT || 3000;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET || 'foo';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);

    models.Teacher.findOne({ id: jwt_payload.id })
    .then(user => {
        if (user) {
            next(null, user)
        } else {
            next(null, false)
        }
    })
});

passport.use(strategy);
app.use(passport.initialize());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));

// Api
app.use('/public', publicRoutes);
app.use('/resources', resources);
app.use('/teacher', passport.authenticate('jwt', { session: false }), teacherRoutes);
app.use('/class', passport.authenticate('jwt', { session: false }), classRoutes);
app.use('/exchange', passport.authenticate('jwt', { session: false }), exchangeRoutes);
app.use('/school', passport.authenticate('jwt', { session: false }), schoolRoutes);

app.use(function (err, req, res, next) {
    console.log('error', err);
    let defaultError;

    if (err && err.defaultError) {
        defaultError = err.defaultError;
    } else {
        defaultError = 'Something went wrong!';
    }
    return sendError(500, err, defaultError, res);

});

app.get('*', (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.set('port', port);

app.listen(app.get('port'), () => console.log(`${port} is a beautiful port.`));

// comment out seed() in prod
if (process.env.NODE_ENV !== 'test') {
    seed();
}

module.exports = app;
