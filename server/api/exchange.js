const app = require('express').Router();
const countries = require('country-list');
const async = require('async');

const Class = require('../db/index').models.Class;
const AgeGroup = require('../db/index').models.AgeGroup;
const Term = require('../db/index').models.Term;
const School = require('../db/index').models.School;
const Exchange = require('../db/index').models.Exchange;
const conn = require('../db/conn');

const { feedback, extractSequelizeErrorMessages } = require('../utils/feedback');
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
        include: [ School ]
    })
    .then(_class => {
        _class = _class.dataValues;
        _class.school = _class.school.dataValues;
        let classData = extractClassAddress(_class);

        return getCoordinates(classData)
        .then(({ location }) => {
            _class.location = location;
            return _class
        })
    })
    .then(_class => {

        Exchange.findAll({
            where: {
                status: 'initiated'
            },
            include: [{
                model: Class,
                where: {
                    id: { $notIn: _class.id },
                    teacherId: { $notIn: _class.teacherId },
                    schoolId: { $notIn: _class.schoolId }
                },
                include: [ School ]
            }]
        })
        .then(exchanges => {

            let matchingClasses = exchanges.filter(exchange => {
                const { termId, ageGroupId, schoolId } = exchange.classes[0];

                if (termId !== _class.termId) return

                if (ageGroupId !== _class.ageGroupId) return

                if (schoolId === _class.schoolId) return

                return  exchange
            });


            /* If matches are found */
            if (matchingClasses.length) {
                const classDataCollection = matchingClasses.map(match => {
                    const data = match.dataValues.classes[0].dataValues;
                    return extractClassAddress(data);
                });

                const classCoords = _class.location;

                return findFurthestMatch(classCoords, classDataCollection)

            } else {
                return 'No matches found.'
            }
        })
        .then(result => {
            // const matchingClassId = id;
        // async:
            // find Exchange
                // setClass _class
            // find teacher for matchClass
                // set role as A
                // create token and expiration
                // get email for teacherA
            // find teacher for _class
                // set role as B
                // create token and expiration
                // get email for teacherB
            // send email to teacherA with token
            // send email to teacherB with token
            console.log('result', result)
            console.log('_class', _class)
            res.send(result)
        })
    })
    // end of findAll exchanges call
    .catch(err => console.log(err))
});



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




module.exports = app;

const extractClassAddress = (_class) => {
    const { zip, country, address1, city } = _class.school;
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
    .catch((err) => {
        // [TODO] handle error
        console.log(err);
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

const findFurthestMatch = (classCoords, collection) => {
    return Promise.all(collection.map(data => getCoordinates(data)))
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


            return { matchClass }
    })
}


// app.post('/resetrequest', (req, res, next) => {
//     const { email } = req.body;

//     async.waterfall([
//         function(done) {
//             crypto.randomBytes(20, function(err, buf) {
//                 const token = buf.toString('hex');
//                 done(err, token);
//             })
//         },
//         function(token, done) {
//             Teacher.findOne({
//                 where: {
//                     email: email,
//                 }
//             })
//             .then(user => {
//                 if (!user) {
//                     let defaultError = ['No user found for this e-mail address.'];

//                     return res.status(401).send({ feedback: feedback(ERROR, defaultError)})
//                 }

//                 user.resetPasswordToken = token;
//                 user.resetPasswordExpires = Date.now() + 3600000;

//                 user.save()
//                 .then( res => {
//                     done(null, token, res.dataValues)
//                 })
//                 .catch(err => {
//                     let defaultError = ['Something went wrong. Please try submitting your email again.'];
//                     return res.status(500).send({ feedback: feedback(ERROR, defaultError)})
//                 });
//             });
//         },
//         function(token, user, done) {
//             const mailOptionsRequestResetPw = {
//                 to: user.email,
//                 from: 'tempwmp@gmail.com',
//                 subject: 'Reset password  | We Make Peace',
//                 text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/public/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//             };
//             smtpTransport.sendMail(mailOptionsRequestResetPw, function(error, response) {
//                 if (error) {

//                     const defaultError = ['Something went wrong. Please try again.'];

//                     res.status(500).send({
//                         feedback: feedback(ERROR, defaultError)
//                     })

//                  } else {

//                     const defaultMessage = ['An e-mail has been sent to ' + user.email + ' with further instructions.'];

//                     res.send({
//                         feedback: feedback(SUCCESS, defaultMessage)
//                     })
//                 }
//                 done(err, 'done');
//             });
//         }],
//         function(err) {
//             if (err) {
//                 console.log('error hitting down here', err);
//                 return next(err);
//             }
//             res.redirect('/')
//         })
// });

