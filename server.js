const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
// const { seed } = require('./server/db/index.js');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));

app.get('*', (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`${port} is a beautiful port.`));

// seed here later
// seed();
