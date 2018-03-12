const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const open = require('open');
// const db = require('./server/db');

const webpack =  require('webpack');
const config =  require('./webpack.config');

const compiler = webpack(config);
const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));

app.get('*', (req, res, next) => {
    return res.sendFile(path.join(__dirname, '/client/src/index.html'));
});

const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`${port} is a beautiful port.`));
app.listen(port, function (error) {
    if(error) {
        console.log(error);
    } else {
        open(`http://localhost:${port}`)
    }
});


// console.log(db)
// seed here later
// db.seed();
