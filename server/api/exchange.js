const app = require('express').Router();
const countries = require('country-list');

const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const Term = require('../db/index').models.Term;
const School = require('../db/index').models.School;
const Teacher = require('../db/index').models.Teacher;
const Exchange = require('../db/index').models.Exchange;
const conn = require('../db/conn');

const { feedback, sendError } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { sendEmail } = require('../utils/smpt');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEKEY,
    Promise: Promise
});

app.post('/', (req, res, next) => {

    const { classId } = req.body;

    Class.findOne({
        where: { id: classId },
        include: [ School, Teacher ]
    })
    .then(_class => {
        let classData = extractClassAddress(_class.dataValues);

        return getCoordinates(classData)
        .then(({ location }) => {
            _class.dataValues.location = location;
            return _class
        })
    })
    .then(_class => {

        return Exchange.findAll({
            where: {
                status: 'initiated'
            },
            include: [{
                model: Class,
                as: 'classA',
                where: {
                    teacherId: { $ne: _class.dataValues.teacherId },
                    schoolId: { $ne: _class.dataValues.schoolId },
                    termId: { $eq: _class.dataValues.termId },
                    ageGroupId: { $eq: _class.dataValues.ageGroupId }
                },
                include: [ School, Teacher ]
            }]
        })
        .then(matches => {
            /* If matches are found */
            if (matches.length) {
                const locationDataForMatches = matches.map(match => {
                    const data = match.dataValues.classA.dataValues;
                    return extractClassAddress(data);
                });

                const classCoords = _class.dataValues.location;

                return findFurthestMatch(classCoords, locationDataForMatches, matches)
                    // .then(result => {
                    //     return matches.find(match => {
                    //         return match.dataValues.classA.dataValues.id === result.id
                    //     })
                    // })
                    .then(exchange => {
                        return conn.transaction((t) => {
                            return exchange.setClassB(_class, { transaction: t })
                            .then(exchange => {
                                exchange.dataValues.classB = _class;
                                const date = new Date();
                                const expires = date.setDate(date.getDate() + 7);

                                exchange.verifyExchangeExpires = expires;
                                exchange.status = 'pending';

                                return exchange.save({ transaction: t })
                            }, { transaction: t })
                            .then(( exchange ) => {
                                /* send email with verification token to both teachers */
                                const classAEmail = exchange.dataValues.classA.dataValues.teacher.dataValues.email;
                                const classBEmail = exchange.dataValues.classB.dataValues.teacher.dataValues.email;


                                const generateEmail = (res, recipient, token) => {
                                    const host = req.get('host');
                                    const link = 'http://' + host + '/#/';

                                    const mailOptions = {
                                    to: recipient,
                                    from: 'tempwmp@gmail.com',
                                    subject: 'Verify Exchange Participation | We Make Peace',
                                    text: "You are receiving this because your class has been matched\n\n" + "Please login and confirm your class' participation within 7 days.\n\n"  + link
                                    };

                                    return sendEmail(res, mailOptions, { transaction: t })
                                }

                                return Promise.all([
                                    generateEmail(res, classAEmail, { transaction: t }),
                                    generateEmail(res, classBEmail, { transaction: t }),
                                ])
                                .then(() => {
                                    return { exchange, _class }
                                })
                            }, { transaction: t })
                            .then(({ exchange, _class }) => {
                                const feedbackMsg = "We have found a match for your class! Please verify your class' participation within 7 days. Thank you for participating!"

                                return {
                                    feedback: feedback(SUCCESS, [feedbackMsg]),
                                    exchange,
                                    _class
                                }
                            }, { transaction: t })
                        })
                    })
            } else {
                /* if no match is found initiate new Exchange instance */
                return initiateNewExchange(_class)
            }
        })
    })
    .then(({ _class, exchange, feedback }) => {
        let _exchange, classRole;
        if (exchange) {
            classRole = exchange.getClassRole(_class.dataValues.id);

            _exchange = exchange.dataValues
            if (exchange.dataValues.classA) {
                _exchange.classA = exchange.dataValues.classA.dataValues
                _exchange.classA.school = exchange.dataValues.classA.school.dataValues;
                _exchange.classA.teacher = exchange.dataValues.classA.teacher.dataValues;
            }
            if (exchange.dataValues.classB) {
                _exchange.classB = exchange.dataValues.classB.dataValues
                _exchange.classB.school = exchange.dataValues.classB.school.dataValues;
                _exchange.classB.teacher = exchange.dataValues.classB.teacher.dataValues;
            }
        }

        res.send({
            _class: extractDataForFrontend(_class, {}),
            exchange: extractDataForFrontend(_exchange, {}),
            classRole,
            feedback
        })
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        sendError(500, error, defaultError, res);
    })
});

app.post('/verify', (req, res, next) => {
    const { classId, exchangeId } = req.body;
    return Exchange.findOne({
        where: {
            id: exchangeId,
            $or: [{ classAId: classId }, { classBId: classId }]
        },
        include: [
            {
                model: Class,
                as: 'classA',
                include: [ School, Teacher ]
            },
            {
                model: Class,
                as: 'classB',
                include: [ School, Teacher ]
        }]
    })
    .then(exchange => {

        let classRole;

        if (exchange) {
            classRole = exchange.getClassRole(classId);
        }

        if (classRole === 'A') {
            exchange.classAVerified = true;
        }

        if (classRole === 'B') {
            exchange.classBVerified = true;
        }

        exchange.save()
        .then(exchange => {
            const { classAVerified, classBVerified } = exchange.dataValues;
            if (classAVerified && classBVerified) {
            // if (classBVerified) {
                return exchange.setStatus('confirmed')
                .then(exchange => {
                    // [TODO]
                    // send email to both of the teachers
                    const classAEmail = exchange.dataValues.classA.dataValues.teacher.dataValues.email;
                    const classBEmail = exchange.dataValues.classB.dataValues.teacher.dataValues.email;

                    const generateEmail = (res, recipient) => {
                        const host = req.get('host');
                        const link = 'http://' + host + '/#/';

                        const mailOptions = {
                        to: recipient,
                        from: "tempwmp@gmail.com",
                        subject: "You have been matched with a class from [country] ",
                        text: "Great News! \n\n" + "Your class is now all set to begin exchanging letters with a class from [country].\n\n"  + "Please login and follow the next steps. \n\n"  + link
                        };

                        return sendEmail(res, mailOptions)
                    }

                    return Promise.all([
                        generateEmail(res, classAEmail),
                        generateEmail(res, classBEmail)
                    ])
                    .then(() => {
                        return exchange
                    })
                    .then(exchange => {
                        const feedbackMsg = ['Thank you for confirming your participaiton! You are now ready to begin the Exchange Program!'];

                        exchange = exchange.dataValues
                        exchange.classA = exchange.classA.dataValues
                        exchange.classA.school = exchange.classA.school.dataValues;
                        exchange.classA.teacher = exchange.classA.teacher.dataValues;

                        exchange.classB = exchange.classB.dataValues
                        exchange.classB.school = exchange.classB.school.dataValues;
                        exchange.classB.teacher = exchange.classB.teacher.dataValues;

                        return res.send({
                            feedback: feedback(SUCCESS, feedbackMsg),
                            classRole,
                            exchange: extractDataForFrontend(exchange, {})
                        })
                    })
                })
            } else {
                // [TODO]
                // send a reminder email to the other class...
                const classAEmail = exchange.dataValues.classA.dataValues.teacher.dataValues.email;
                const classBEmail = exchange.dataValues.classB.dataValues.teacher.dataValues.email;

                const otherClassesEmail = classRole === 'A' ? classBEmail : classAEmail;

                const generateEmail = (res, recipient) => {
                    const host = req.get('host');
                    const link = 'http://' + host + '/#/';

                    /** Reminder email to the other class **/
                    const mailOptions = {
                    to: recipient,
                    from: "tempwmp@gmail.com",
                    subject: "Reminder to confirm Peace Letter Participation",
                    text: "Great news! The other class has confirmed their participation in the Peace Letter Exchange with your class. We are currently awaiting your class' confirmaiton. \n\n" + "Please confirm by [date of expiration]!"
                    };

                    return sendEmail(res, mailOptions)
                }

                return generateEmail(res, otherClassesEmail)
                .then(() => {
                    return exchange
                })
                .then(exchange => {
                    console.log('exchange', exchange)

                    exchange = exchange.dataValues
                    exchange.classA = exchange.classA.dataValues
                    exchange.classA.school = exchange.classA.school.dataValues;
                    exchange.classA.teacher = exchange.classA.teacher.dataValues;

                    exchange.classB = exchange.classB.dataValues
                    exchange.classB.school = exchange.classB.school.dataValues;
                    exchange.classB.teacher = exchange.classB.teacher.dataValues;

                    const feedbackMsg = ["Thank you for confirming your participaiton in the program. We are currently awaiting the other class' confirmaiton. Look out for an email!"]

                    return res.send({
                        feedback: feedback(SUCCESS, feedbackMsg),
                        classRole,
                        exchange: extractDataForFrontend(exchange, {})
                    })
                })

            }
        })
    })
});

module.exports = app;

const initiateNewExchange = (_class) => {
    return Exchange.create({ status: 'initiated' })
    .then(exchange => {
        return exchange.setClassA(_class)
        .then(exchange => {

            exchange.dataValues.classA = _class;

            const feedbackMsg = "Your class is now registered in the Peace Letter Program. You will receive an email once we have found an Exchange Class to match you with. Thank you for participating! "

            return {
                feedback: feedback(SUCCESS, [feedbackMsg]),
                exchange,
                _class
            }
        })
    })
}


const extractClassAddress = (_class) => {
    const { zip, country, address1, city } = _class.school.dataValues;
    const countryName = countries().getName(country);
    const address = `${address1}, ${city}, ${countryName}`;

    const data = {
        id: _class.id,
        address: address
    }

    return data
}

const getCoordinates = (data) => {
    return googleMapsClient.geocode({ address: data.address })
    .asPromise()
    .then((response) => {
        return {
            id: data.id,
            location: response.json.results[0].geometry.location
        }
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        return sendError(500, error, defaultError, res);
    });
}

/* helper fn that calculates distance between coordinates */
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

const findFurthestMatch = (classCoords, locationData, matches) => {
    return Promise.all(locationData.map(data => getCoordinates(data)))
        .then(dataWithCoords => {

            const matchClass = dataWithCoords.reduce((result, curr) => {
                const currCoords = curr.location;
                const distance =  calculateDistance(classCoords, currCoords);

                if (distance > result.distance) {
                    result.id = curr.id;
                    result.distance = distance;
                }
                return result
            }, { id: null, distance: 0 })

            return matchClass
    })
    .then(result => {
        return matches.find(match => match.dataValues.classA.dataValues.id === result.id)
    })
}

