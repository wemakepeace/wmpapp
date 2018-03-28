const conn = require('../../conn');
const Sequelize = conn.Sequelize;
const phone = require('phone');

const { saltHashPassword } = require('../../utils/security');

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
        unique: {
            args: true,
            msg: 'This email address is already registered.'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'The email you entered is not a valid email address.'
            },
            notEmpty: { msg: 'Please fill in email address.' },
        }
    },
    phone: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Phone number cannot be empty.'},
            isPhone(value) {
                if (value === '') {
                    return
                }

                const phoneValid = phone(value);

                if (!phoneValid.length) {
                    throw new Error('The number you entered is not valid phone number');
                }
            }
        }
    },
    salt: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    }
});


// May want to make this async since node is single threaded
Teacher.beforeCreate((teacher, options) => {
    if(!teacher.password) {
        throw new Error('You need to enter a password.')
    }
    const hashedPw = saltHashPassword(teacher.password);
    teacher.salt = hashedPw.salt;
    teacher.password = hashedPw.passwordHash;
});


Teacher.beforeUpdate((teacher, options) => {
    if(options.fields.indexOf('password') > -1) {
        const hashedPw = saltHashPassword(teacher.password);
        teacher.salt = hashedPw.salt;
        teacher.password = hashedPw.passwordHash;
    }
});


module.exports = Teacher;
