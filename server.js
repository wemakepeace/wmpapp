const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const open = require('open');
const { seed } = require('./server/index.js');
// const models = require('./server').models;
const models = require('./server/index.js').models;


const webpack =  require('webpack');
const config =  require('./webpack.config');
const compiler = webpack(config);




const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


let jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET || 'foo';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received!!!!!', jwt_payload);

    models.Teacher.findOne({
        where: {
           id: jwt_payload.id
        }
    })
    .then(user => {
        if (user) {
            console.log('this gets hit', user)
            next(null, user)
        } else {
            next(null, false)
        }
    })
});


passport.use(strategy);



// require('./server/api/passport');

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

const authRoutes = require('./server/api/auth');
const publicRoutes = require('./server/api/public');
const secretRoutes = require('./server/api/secret');
const classRoutes = require('./server/api/class');

app.use('/auth', authRoutes);
app.use('/secret', passport.authenticate('jwt', { session: false }), secretRoutes);
// app.use('/class', passport.authenticate('jwt', { session: false }), classRoutes);
app.use('/public', publicRoutes);




app.get('*', (req, res, next) => {
    return res.sendFile(path.join(__dirname, '/client/src/index.html'));
});

const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(app.get('port'), () => console.log(`${port} is a beautiful port.`));

seed();
