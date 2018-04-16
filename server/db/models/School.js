const conn = require('../conn');
const Sequelize = conn.Sequelize;
const postcode = require('postcode-validator');

const School = conn.define('school', {
     name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out school name.'}
        }
    },
    address1: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out school address.'}
        }
    },
    address2: {
        type: Sequelize.STRING,
    },
    zip: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Zip code cannot be empty'},
            // isZip(value) {
            //     if (value === '') {
            //         return
            //     }

            //     const zipValid = postcode.validate(value, 'US');

            //     if (!zipValid) {
            //         throw new Error('The zip code you entered is not valid')
            //     }
            // }
        }
    },
    city: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out school address.'}
        }
    },
    state: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out school address.'}
        }
    }
});


module.exports = School;