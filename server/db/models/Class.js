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
    verifyExchangeTokenExpires: Sequelize.DATE,
    role: Sequelize.STRING
});


module.exports = Class;

/*
    Attribute role can be either A or B.
    A Teacher user with role A will initiate the letter exchanging process.
    A Teacher user with role B will wait for letter batch from Teacher A's class,
    and write letters upon receiving letters.
*/
