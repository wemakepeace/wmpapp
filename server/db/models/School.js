const conn = require('../conn');
const Sequelize = conn.Sequelize;
const getCoordinates = require('../utils/helpers');

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
        type: conn.Sequelize.STRING
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
    },
    lat: Sequelize.FLOAT,
    lng: Sequelize.FLOAT
});

// Class methods

/*
 * Will either create a new school instance or update an existing school
 * Will calculate the coordinates for the school address
*/
School.createOrUpdate = function(schoolData, t) {
    return getCoordinates(schoolData)
    .then((data) => {
        return data.location
    })
    .then((coordinates) => {
        schoolData.lat = coordinates.lat;
        schoolData.lng = coordinates.lng;
        if (!schoolData.id) {
            return School.create(schoolData, { transaction: t });
        } else {
            return School.findById(schoolData.id)
                .then(school => school.update(schoolData, { transaction: t }));
        }
    })
};

module.exports = School;
