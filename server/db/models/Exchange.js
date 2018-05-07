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
    }
});


module.exports = Exchange;
