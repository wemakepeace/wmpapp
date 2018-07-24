const conn = require('../conn');
const Sequelize = conn.Sequelize;
const postcode = require('postcode-validator');

const School = conn.define('school', {
     schoolName: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out school name.'}
        }
    },
    address1: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out address.'}
        }
    },
    address2: {
        type: Sequelize.STRING,
    },
    zip: {
        type: conn.Sequelize.STRING,
        // validate: {
            // notEmpty: { msg: 'Please fill out zip code.'},
            // isZip(value) {
            //     if (value === '') {
            //         return
            //     }

            //     const zipValid = postcode.validate(value, 'US');

            //     if (!zipValid) {
            //         throw new Error('The zip code you entered is not valid')
            //     }
            // }
        // }
    },
    city: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out city.'}
        }
    },
    state: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please fill out country.'}
        }
    }
});

// Class methods

School.createOrUpdate = function(schoolData, t) {
    if (schoolData && schoolData.country) schoolData.country = schoolData.country.value;
    if (schoolData.id === null) {
        return School.create(schoolData, { transaction: t });
    } else {
        return School.findById(schoolData.id)
            .then(school => school.update(schoolData, { transaction: t }));
    }
};


// Instance methods



module.exports = School;
