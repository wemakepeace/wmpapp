const countries = require('country-list');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEKEY,
    Promise: Promise,
    rate: { limit: 50 }

});

const extractClassAddress = (_class) => {
    const { zip, country, address1, city } = _class.school.dataValues;
    const countryName = countries().getName(country);
    const address = `${address1}, ${city}, ${countryName}`;
    const data = {
        id: _class.id,
        address: address
    };
    console.log('data', data)
    return data;
};

const getLocationDataForMatches = (matches) => {
    return matches.map(match => {
        const data = match.dataValues.sender.dataValues;
        return extractClassAddress(data);
    });
};



const getCoordinates = (data) => {
    return googleMapsClient.geocode({ address: '1600 Amphitheatre Parkway, Mountain View, CA' })
    .asPromise()
    .then(response => {
        console.log('response', response)
        return {
            id: data.id,
            location: response.json.results[0].geometry.location
        }
    })
    .catch(error => {
        console.log('error', error)
        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        throw new Error(error);
    });
}

/* helper fn that calculates distance between coordinates */
const calculateDistance = (location1, location2) => {
    const kilometerPerMile = 1.609344;
    const curvature = 1.1515;
    const radlat1 = Math.PI * location1.lat / 180;
    const radlat2 = Math.PI * location2.lat / 180;
    const radlon1 = Math.PI * location1.lng / 180;
    const radlon2 = Math.PI * location2.lng / 180;
    const theta = location1.lng - location2.lng;
    const radtheta = Math.PI * theta / 180;

    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * curvature;
    const totalMiles = dist * kilometerPerMile;
    return totalMiles;
};


const findFurthestMatch = (_class, matches) => {
    let classData = extractClassAddress(_class.dataValues);

    return getCoordinates(classData)
    .then(({ location }) => location)
    .then(classCoordinates => {
        console.log('classCoordinates', classCoordinates)
        const locationDataForMatches = getLocationDataForMatches(matches);
            return Promise.all(locationDataForMatches.map(data => getCoordinates(data)))
            .then(dataWithCoords => {
                const matchClass = dataWithCoords.reduce((result, curr) => {
                    const currCoords = curr.location;
                    const distance =  calculateDistance(classCoordinates, currCoords);

                    if (distance > result.distance) {
                        result.id = curr.id;
                        result.distance = distance;
                    }

                    return result;

                }, { id: null, distance: 0 });

                return matchClass;
            })
            .then(result => {
                return matches.find(match => match.dataValues.sender.dataValues.id === result.id);
            });
    })
};

module.exports = { findFurthestMatch };
