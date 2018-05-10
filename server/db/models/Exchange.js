const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Exchange = conn.define('exchange', {
     status: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: '.....'}
        }
    },
    teacherAVerfified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    teacherBVerfified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    verifyExchangeToken: Sequelize.STRING,
    verifyExchangeTokenExpires: Sequelize.DATE
});


module.exports = Exchange;

/*
    Exchange statuses
    - initiated
    - pending
    - confirmed
    - cancelled
    - completed

*/
