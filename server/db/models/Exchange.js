const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Exchange = conn.define('exchange', {
     status: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: '.....'}
        }
    }
});


module.exports = Exchange;
