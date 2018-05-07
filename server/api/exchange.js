const app = require('express').Router();
const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const Term = require('../db/index').models.Term;
const School = require('../db/index').models.School;
const Exchange = require('../db/index').models.Exchange;
const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

const countries = require('country-list');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEKEY,
    Promise: Promise
});

app.post('/', (req, res, next) => {
    const { classId } = req.body;
    Class.findOne({
        where: { id: classId },
        include: [ School ]
    })
    .then(_class => {
        _class = _class.dataValues;
        _class.school = _class.school.dataValues;
        let classData = extractClassData(_class);
        // console.log('classData', classData)
        return googleMapsClient.geocode({ address: classData.address })
            .asPromise()
            .then((response) => {

                _class.location = response.json.results[0].geometry.location
                return _class
            })
            .catch((err) => {
                // [TODO] handle error
                console.log(err);
            })
        })
    .then(_class => {

        Exchange.findAll({
            where: {
                status: 'initiated'
            },
            include: [{
                model: Class,
                where: { id: { $notIn: _class.id }},
                include: [ School ]
            }]
        })
        .then(exchanges => {

            let matchingClasses = exchanges.filter(exchange => {
                // console.log('exchange.classes[0]', exchange.classes[0])
                // console.log('_class', _class)
                if (exchange.classes[0].termId !== _class.termId) {
                    return
                }
                if (exchange.classes[0].ageGroupId !== _class.ageGroupId) {
                    return
                }
                if (exchange.classes[0].schoolId === _class.schoolId) {
                    return
                }
                return  exchange
            })

            const classDataCollection = matchingClasses.map(match => {
                const data = match.dataValues.classes[0].dataValues;
                return extractClassData(data)
            });
            // if more than one class
            if (matchingClasses.length > 1) {

                Promise.all(classDataCollection.map(data => {
                    // '1600 Amphitheatre Parkway, Mountain View, CA'
                    return googleMapsClient.geocode({address: data.address})
                    .asPromise()
                    .then((response) => {

                        data.location = response.json.results[0].geometry.location
                        return data
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }))
                .then(dataWithCoords => {
                    dataWithCoords.map(x => console.log('x', x))
                    let matchClass;
                    console.log('_class', _class)
                    console.log('dataWithCoords', dataWithCoords)

                    if (dataWithCoords.length) {
                        const _classCoords = _class.location;
                        matchClass = dataWithCoords.reduce((result, curr) => {
                            const currCoords = curr.location;
                            const distance =  calculateDistance(_classCoords, currCoords);
                            console.log('distance', distance)
                            if (distance > result.distance) {
                                result.id = curr.id;
                                result.distance = distance;
                            }
                            return result
                        }, { id: null, distance: 0})
                    }
                    console.log('matchClass', matchClass)
                    res.send(matchClass)
                })
            }
                // create verify tokens for both classes
                // update Class instances with tokens
                // send that match back with verify token and message
                // send email to other teacher

            // console.log('matchingClasses', matchingClasses)
            // res.send('to be continued')
        })
    })
    .catch(err => console.log(err))



                // update Exchange instance with classAId and classBId

    // find all classes with matching term
    // find all classes with matching age group
    // make sure class is not from same school
    // make sure an exchange has not been attempted between the schools before
    // choose the class that is furthest away

    // if a class match is found
        // send emails to both class teachers
    // if no class match is founf
        // create an Exchange instance and set classId to classAId
        // and send email to teacher and send message to UI



});

module.exports = app;

const extractClassData = (_class) => {
    let data;
    const zip = _class.school.zip
    const countryCode =  _class.school.country;
    const address1 = _class.school.address1;
    const city = _class.school.city;
    const country = countries().getName(countryCode);
    const address = `${address1}, ${city}, ${country}`;

    data = {
        id: _class.id,
        address: address
    }
    return data
}

const getCoords = (match) => {
     let matchClass = match.dataValues.classes[0].dataValues;

    // Using promise

    const zip = matchClass.school.zip
    const countryCode =  matchClass.school.country;
    const address1 = matchClass.school.address1;
    const city = matchClass.school.city;
    const country = countries().getName(countryCode);
    const address = `${address1}, ${city}, ${country}`

    // '1600 Amphitheatre Parkway, Mountain View, CA'
    googleMapsClient.geocode({address: address})
    .asPromise()
    .then((response) => {
        matchClass.location = response.json.results[0].geometry.location
        console.log('matchClass.location', matchClass.location);
        return matchClass
    })
    .catch((err) => {
        console.log(err);
    });
}


const findMatchFn = (schoolDetails) => {
    return (dispatch)=> {
        return axios.get(`/api/class/${schoolDetails.semester}`)
        .then(response => {
            const classes = response.data;
            const lat = schoolDetails.coordinates[ 0 ];
            const lng = schoolDetails.coordinates[ 1 ];
            let longest = 0;
            let match = classes.reduce( (match, currClass) => {
                const currDistance = distance(lat, lng, currClass.coordinates[0], currClass.coordinates[1]);
                if (currDistance > longest) {
                    longest = currDistance;
                    match = currClass;
                }

                match.latlng = match.coordinates;
                return match;
            });

            const matchLat = match.latlng[ 0 ];
            const matchLng = match.latlng[ 1 ];

            dispatch(fetchCountryCode(matchLat, matchLng, "matchClass"));
            return dispatch(matchFound(match));
        });
    };
}

/* helper fn that calculates distance between coordinates */
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const calculateDistance = (location1, location2) => {
    const radlat1 = Math.PI * location1.lat / 180
    const radlat2 = Math.PI * location2.lat / 180
    const radlon1 = Math.PI * location1.lng / 180
    const radlon2 = Math.PI * location2.lng / 180
    const theta = location1.lng - location2.lng
    const radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return dist * 1.609344;
}
