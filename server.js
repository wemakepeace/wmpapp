require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const open = require('open');
const { seed, models } = require('./server/db/index.js');

const webpack =  require('webpack');
const config =  require('./webpack.config');
const compiler = webpack(config);

const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET || 'foo';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);

    models.Teacher.findOne({
        where: {
           id: jwt_payload.id
        },
        include: [
            {
                model: models.Class,
                where: { id: jwt_payload.classId }
            }
        ]
    })
    .then(user => {
        if (user) {
            next(null, user)
        } else {
            next(null, false)
        }
    })
});

passport.use(strategy);

const app = express();
app.use(passport.initialize());

app.use(require('webpack-hot-middleware')(compiler));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    serverSideRender: true
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));

const publicRoutes = require('./server/api/public');
const sessionRoutes = require('./server/api/session');
const teacherRoutes = require('./server/api/teacher');


app.use('/public', publicRoutes);
app.use('/session', passport.authenticate('jwt', { session: false }), sessionRoutes);
app.use('/teacher', passport.authenticate('jwt', { session: false }), teacherRoutes);


app.get('*', (req, res, next) => {
    return res.sendFile(path.join(__dirname, '/client/src/index.html'));
});

const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(app.get('port'), () => console.log(`${port} is a beautiful port.`));

seed();
