const countries = require('country-list');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEKEY,
    Promise: Promise,
    rate: { limit: 50 }
});

const extractGeocodeString = (data) => {
    const { zip, country, address1, city } = data;
    const countryName = countries().getName(country);
    const geocodeString = `${address1}, ${city}, ${countryName}`;
    return geocodeString;
};

const getCoordinates = (data) => {
    const geocodeString = extractGeocodeString(data);
    return googleMapsClient.geocode({ address: geocodeString })
    .asPromise()
    .then(response => {
        return {
            id: data.id,
            location: response.json.results[0].geometry.location
        }
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        throw new Error(error);
    });
}

module.exports = getCoordinates;
