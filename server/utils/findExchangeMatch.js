// Calculates distance between coordinates
const calculateDistance = (location1, location2) => {
    const curvature = 1.1515;
    const radlat1 = Math.PI * location1.lat / 180;
    const radlat2 = Math.PI * location2.lat / 180;
    const theta = location1.lng - location2.lng;
    const radtheta = Math.PI * theta / 180;

    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * curvature;
    return dist;
};

// Finds the furthest located class
const findFurthestMatch = (_class, matches) => {
    const classCoordinates = {
        lat: _class.dataValues.school.dataValues.lat,
        lng: _class.dataValues.school.dataValues.lng
    };

    const matchClass = matches.reduce((result, curr) => {
        const exchangeId = curr.dataValues.id;
        const currCoords = {
            lat: curr.dataValues.sender.school.dataValues.lat,
            lng: curr.dataValues.sender.school.dataValues.lng
        };

        const distance =  calculateDistance(classCoordinates, currCoords);

        if (distance > result.distance) {
            result.id = exchangeId;
            result.distance = distance;
        }

        return result;

    }, { id: null, distance: 0 });

    return matches.find(match => {
        return match.dataValues.id === matchClass.id;
    });
};

module.exports = { findFurthestMatch };
