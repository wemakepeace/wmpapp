const conn = require('../../conn');
const Sequelize = conn.Sequelize;

const Teacher = conn.define('teacher', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please fill in your first name.'}
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please fill in your last name.'}
        }
    },
    email: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: { msg: 'Please fill in email' },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please fill in your first name.'}
        }
    }
})


module.exports = Teacher;
