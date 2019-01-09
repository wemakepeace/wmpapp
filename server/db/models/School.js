const conn = require('../conn');
const Sequelize = conn.Sequelize;
const getCoordinates = require('../utils/helpers');
const lookup = require('country-code-lookup');

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
    continent: {
        type: Sequelize.STRING,
    },
    lat: Sequelize.FLOAT,
    lng: Sequelize.FLOAT
});

// Hooks

// Will calculate and save the coordinates for the school address
School.beforeCreate((school) => {
    return getCoordinates(school)
    .then((data) => data.location)
    .then((coordinates) => {
        school.lat = coordinates.lat;
        school.lng = coordinates.lng;
    })
    .then(() => {
        school.continent = lookup.byIso(school.country).continent;
    });
});

School.beforeUpdate((school, options) => {
    return getCoordinates(school)
    .then((data) => data.location)
    .then((coordinates) => {
        school.lat = coordinates.lat;
        school.lng = coordinates.lng;
    })
    .then(() => {
        school.continent = lookup.byIso(school.country).continent;
    });
});


// Class methods

// Will either create a new school instance or update an existing school
School.createOrUpdate = function(schoolData, t) {
    if (!schoolData.id) {
        return School.create(schoolData, { transaction: t });
    } else {
        return School.findById(schoolData.id)
        .then((school) => school.update(schoolData, { transaction: t }));
    }
};


module.exports = School;
