const app = require('express').Router();
const countries = require('country-list');

const Class = require('../db').models.Class;
const AgeGroup = require('../db').models.AgeGroup;
const Term = require('../db').models.Term;
const School = require('../db').models.School;
const Teacher = require('../db').models.Teacher;
const Exchange = require('../db').models.Exchange;
const conn = require('../db/conn');

const { feedback, sendError } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { sendEmail, generateEmailAdvanced } = require('../utils/smpt');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEKEY,
    Promise: Promise
});


app.post('/', (req, res, next) => {
    const { classId } = req.body;

    Class.findOne({
        where: { id: classId },
        include: [
            School,
            Teacher,
            AgeGroup,
            Term
        ]
    })
    .then(_class => {
        const { teacherId, schoolId, termId, ageGroupId } = _class.dataValues;

        return Exchange.findAll({
            where: {
                status: 'initiated'
            },
            include: [{
                model: Class,
                as: 'classA',
                where: {
                    teacherId: { $ne: teacherId },
                    schoolId: { $ne: schoolId },
                    termId: { $eq: termId },
                    ageGroupId: { $eq: ageGroupId }
                },
                include: [ School, Teacher ]
            }]
        })
        .then(matchingClasses => {
            /* If matches are found */
            if (matchingClasses && matchingClasses.length) {
                return findFurthestMatch(_class, matchingClasses)
                .then(exchange => {
                    return conn.transaction((t) => {
                        return exchange.setClassB(_class, { transaction: t })
                        .then(exchange => exchange.setStatus('pending', t))
                        .then(exchange => exchange.setVerificationExpiration(t))
                        .then(exchange => {
                            // [TODO]
                            // not sure this is working.....
                            exchange.dataValues.classB = _class;
                            /* send email with verification token to both teachers */
                            const classAEmail = exchange.dataValues.classA.dataValues.teacher.dataValues.email;
                            const classBEmail = exchange.dataValues.classB.dataValues.teacher.dataValues.email;

                            const generateEmail = (res, recipient, token) => {
                                const host = req.get('host');
                                const link = 'http://' + host + '/#/';

                                const mailOptions = {
                                    to: recipient,
                                    from: process.env.MAIL_FROM,
                                    subject: 'Verify Exchange Participation | We Make Peace',
                                    text: "You are receiving this because your class has been matched\n\n" + "Please login and confirm your class' participation within 7 days.\n\n"  + link
                                };

                                return sendEmail(res, mailOptions, { transaction: t })
                            };

                            return Promise.all([
                                generateEmail(res, classAEmail, { transaction: t }),
                                generateEmail(res, classBEmail, { transaction: t }),
                            ])
                            .then(() => {
                                return { exchange, _class }
                            })
                        }, { transaction: t })
                        .then(({ exchange, _class }) => {
                            const feedbackMsg = "We have found a match for your class! Please verify your class' participation within 7 days. Thank you for participating!";

                            return {
                                feedback: feedback(SUCCESS, [feedbackMsg]),
                                exchange,
                                _class
                            };
                        }, { transaction: t })
                    })
                })
            } else {
                /* if no match is found initiate new Exchange instance */
                return initiateNewExchange(_class);
            }
        });
    })
    .then(({ _class, exchange, feedback }) => {
        let classRole;

        if (exchange) {
            classRole = exchange.getClassRole(_class.dataValues.id);
            exchange = formatData(exchange, classRole);
            exchange.classRole = classRole
        }

        res.send({
            _class: extractDataForFrontend(_class, {}),
            exchange: extractDataForFrontend(exchange, {}),
            classRole,
            feedback
        });
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        // sendError(500, error, defaultError, res);
        return next(error)
    })
});

/** Route to verify exchange participation **/
/** Both classes must verify by the time verifyExchangeExpires expires **/
/** Notes: Here we could verify the expiration on the call or we could run a cleanup function that voids all expired instances, in which case the classes should be notified **/
/** If a one class has confirmed the exchange, that class will be added to a new Exchnage instance as classA, and the class that did not confirm will be removed (not belong to any exchange) **/


/*** CONSIDER DOING A TRANSACTION HERE ***/
app.post('/verify', (req, res, next) => {
    const { classId, exchangeId } = req.body;
    let classRole;
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
        return exchange.getClassRole(classId)
        .then((_classRole) => {
            if (_classRole === 'A') {
                exchange.classAVerified = true;
            }

            if (_classRole === 'B') {
                exchange.classBVerified = true;
            }
            classRole = _classRole
            console.log('classRole', classRole)
            return exchange.save()
        })
        .then(exchange => {

            const { classAVerified, classBVerified } = exchange.dataValues;
            const classAEmail = exchange.dataValues.classA.dataValues.teacher.dataValues.email;
            const classBEmail = exchange.dataValues.classB.dataValues.teacher.dataValues.email;
            let feedbackMsg;

            if (classAVerified && classBVerified) {
                return exchange.setStatus('confirmed')
                .then(exchange => {
                    /** Send email to both teachers **/
                    const generateEmail = (res, recipient) => {
                        const host = req.get('host');
                        const link = 'http://' + host + '/#/';

                        const mailOptions = {
                            to: recipient,
                            from: "tempwmp@gmail.com",
                            subject: "You have been matched with a class from [country] ",
                            text: "Great News! \n\n" + "Your class is now all set to begin exchanging letters with a class from [country].\n\n"  + "Please login and follow the next steps. \n\n"  + link
                        };

                        return sendEmail(res, mailOptions);
                    }

                    return Promise.all([
                        generateEmail(res, classAEmail),
                        generateEmail(res, classBEmail)
                    ])
                    .then(() =>{
                        feedbackMsg = ['Thank you for confirming your participation! You are now ready to begin the Exchange Program!'];
                        return { exchange, feedbackMsg };
                    });
                })
            } else {
                const otherClassEmail = classRole === 'A' ? classBEmail : classAEmail;
                const classData = classRole === 'A' ? exchange.dataValues.classA : exchange.dataValues.classB;
                const otherClass = classRole === 'A' ? exchange.dataValues.classB : exchange.dataValues.classA;

                return generateEmailAdvanced(res, otherClassEmail, 'reminder', otherClass, classData)
                .then(() => {

                    feedbackMsg = ["Thank you for confirming your participaiton in the program. We are currently awaiting the other class' confirmaiton. Look out for an email!"];

                    return { exchange, feedbackMsg };
                });
            }
        })
        .then(({ exchange, feedbackMsg }) => {

            exchange = formatData(exchange);

            return res.send({
                feedback: feedback(SUCCESS, feedbackMsg),
                classRole,
                exchange: extractDataForFrontend(exchange, {})
            });
        })
        .catch(error => {
            const defaultError = 'Something went wrong when initiating exchange.';
            error.defaultError = defaultError;
            next(error);
        });
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        return next(error);
    });
});

module.exports = app;

 // Helper function to extract data from exchange instance

const formatData = (data) => {
    const exchange = data.dataValues;

    if (exchange.classA) {
        exchange.classA = exchange.classA.dataValues;
        exchange.classA.term = exchange.classA.term;
        exchange.classA.school = exchange.classA.school.dataValues;
        exchange.classA.teacher = exchange.classA.teacher.dataValues;
    }
    if (exchange.classB) {
        exchange.classB = exchange.classB.dataValues
        exchange.classB.school = exchange.classB.school.dataValues;
        exchange.classB.teacher = exchange.classB.teacher.dataValues;
    }
    return exchange;
};

const formatDataNew = (data, classRole) => {
    const exchange = data.dataValues;
    const exChangeClassRole = classRole === 'A' ? 'classB' : 'classA';
    const exChangeClass = exchange[ exChangeClassRole ];
    if (exchangeClass) {
        exchange.exchangeClass = exchange.exChangeClass.dataValues;
        exchange.exChangeClass.term = exchange.exChangeClass.term;
        exchange.exChangeClass.school = exchange.exChangeClass.school.dataValues;
        exchange.exChangeClass.teacher = exchange.exChangeClass.teacher.dataValues;
    }

    return exchange;
};

const initiateNewExchange = (_class) => {
    return Exchange.create({ status: 'initiated' })
    .then(exchange => {
        return exchange.setClassA(_class)
        .then(exchange => {
            exchange.dataValues.classA = _class;
            const feedbackMsg = "Your class is now registered in the Peace Letter Program. You will receive an email once we have found an Exchange Class to match you with. Thank you for participating! ";

            return {
                feedback: feedback(SUCCESS, [feedbackMsg]),
                exchange,
                _class
            };
        });
    });
};

const extractClassAddress = (_class) => {
    const { zip, country, address1, city } = _class.school.dataValues;
    const countryName = countries().getName(country);
    const address = `${address1}, ${city}, ${countryName}`;
    const data = {
        id: _class.id,
        address: address
    };

    return data;
};

const getLocationDataForMatches = (matches) => {
    return matches.map(match => {
        const data = match.dataValues.classA.dataValues;
        return extractClassAddress(data);
    });
};

const getCoordinates = (data) => {
    return googleMapsClient.geocode({ address: data.address })
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
        return next(error);
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
                return matches.find(match => match.dataValues.classA.dataValues.id === result.id);
            });
    });
};


// One line comments should look like this

/*
 * Multi line comments should
 * look like this
 */

/*
 * In general I would say that this is really great stuff overall. I think some things you
 * could do to help with readability would be to work on spacing things more consistently,
 * and split these huge requests into smaller functions. For example, you could name the
 * callback functions so that reading the promise chain reads like english. Here's what I
 * mean using arbitrary functions...
 *
 * createUser()
 *      .then(setUserData)
 *      .then(assignUserClass)
 *      .then(findUserMatch)
 *      .finally(done);
 *
 * ... something like this could help with the readability so other devs looking at the
 * code can easily see what is happening. And this uses the power of JavaScript by passing
 * named callback functions to other functions.
 *
 * Other improvements you could make would be to see where there are repeated sections of code and
 * refactor those into reusable functions.
 */
