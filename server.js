const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const open = require('open');
const { seed } = require('./server/index.js');
const models = require('./server').models;

const webpack =  require('webpack');
const config =  require('./webpack.config');

const classRoutes = require('./server/api/class');

const compiler = webpack(config);
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    serverSideRender: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));


const passport = require('passport');
require('./server/api/passport');

const auth = require('./server/api/auth');
const publicRoutes = require('./server/api/public');

app.use('/auth', auth);
app.use('/public', publicRoutes);
app.use('/class', passport.authenticate('jwt', { session: false }), classRoutes);



app.get('*', (req, res, next) => {
    return res.sendFile(path.join(__dirname, '/client/src/index.html'));
});

const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(app.get('port'), () => console.log(`${port} is a beautiful port.`));

seed();
