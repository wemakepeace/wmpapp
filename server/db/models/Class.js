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
            notEmpty: { msg: 'Please fill out class size.'},
            isInteger(value) {
                // console.log('value', value)
                if (Number(value) == NaN) {
                    console.log('Number(value)', Number(value))
                    throw new Error('Class size must be a number.')
                }
            }
        }
    }
});


module.exports = Class;
