const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Class = conn.define('class', {
     name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please fill out class name.'}
        }
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please fill out class size.'}
        }
    }
});


module.exports = Class;
