const nodemon = require('nodemon');

nodemon('--ignore dist/ --ignore src/ server.js sass --watch')
.on('start', () => process.env.RUNNING = true);
