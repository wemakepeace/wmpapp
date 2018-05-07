const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Class = conn.define('class', {
     name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out class name.'}
        }
    },
    size: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out class size.'}
        }
    },
    verifyExchangeToken: Sequelize.STRING,
    verifyExchangeTokenExpires: Sequelize.DATE
});


module.exports = Class;
