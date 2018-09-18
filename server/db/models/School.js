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
    lat: Sequelize.STRING,
    lng: Sequelize.STRING
});

const countries = require('country-list');

const extractGeocodeString = (data) => {
    const { zip, country, address1, city } = data;
    const countryName = countries().getName(country);
    const geocodeString = `${address1}, ${city}, ${countryName}`;
    return geocodeString;
};

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEKEY,
    Promise: Promise,
    rate: { limit: 50 }
});


const getCoordinates = (data) => {
    const geocodeString = extractGeocodeString(data);
    return googleMapsClient.geocode({ address: geocodeString })
    .asPromise()
    .then(response => {
        console.log('response.json.results[0].geometry.location', response.json.results[0].geometry.location)
        return {
            id: data.id,
            location: response.json.results[0].geometry.location
        }
    })
    .catch(error => {
        console.log('error', error)
        // [TODO]
        // if we are not able to get the lat long of an address,
        // we should get coords for a place such as the city or country.

        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        throw new Error(error);
    });
}

// Class methods

School.createOrUpdate = function(schoolData, t) {
    return getCoordinates(schoolData)
    .then((data) => {
        return data.location
    })
    .then((coordinates) => {
        schoolData.lat = coordinates.lat;
        schoolData.lng = coordinates.lng;
        if (!schoolData.id) {
            return School.create(schoolData);
        } else {
            return School.findById(schoolData.id)
                .then(school => school.update(schoolData));
        }
    })
};


// Instance methods

module.exports = School;
