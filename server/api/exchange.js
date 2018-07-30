const app = require('express').Router();
const { models } = require('../db');
const Class = models.Class;
const AgeGroup = models.AgeGroup;
const Term = models.Term;
const School = models.School;
const Teacher = models.Teacher;
const Exchange = models.Exchange;
const conn = require('../db/conn');
const { feedback, sendError } = require('../utils/feedback');
const { generateEmail } = require('../utils/email/exchange');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');

/*
 * Handles the following cases:
 * 1.   One match is found - updates exchange instance returns exchange and matchClass
 * 2.   Multiple matches are found - finds furthest match, updates exchange instance
 *      and return exchange and matchClass
 * 3.   No match is found - Initiates new exchange, sets class to classA and returns exchange
 */

app.post('/', (req, res, next) => {
    const { classId } = req.body;

    Class.findOne({
        where: { id: classId },
        // attributes: ['id', 'name', 'teacherId', 'schoolId', 'termId', 'ageGroupId'],
        include: [
            { model: School },
            { model: Teacher }
            // { model: Teacher, attributes: [ 'id', 'email' ] }
        ]
    })
    .then((_class) => {
        return Exchange.findMatch(_class)
        .then(exchange => {
            // If match is found, _class will have classRole = B
            if (exchange) {
                return conn.transaction((t) => {
                    return exchange.setClassB(_class, { transaction: t })
                    .then(exchange => exchange.setStatus('pending', t))
                    .then(exchange => exchange.setVerificationExpiration(t))
                    .then(exchange => {
                        // At this point exchange.classA will be the matching class
                        const classData = _class.dataValues;
                        const matchClass = exchange.dataValues.classA.dataValues;
                        const classEmail = classData.teacher.dataValues.email;
                        const matchEmail = matchClass.teacher.dataValues.email;
                        const template = 'verify';

                        return Promise.all([
                            generateEmail(res, classEmail, template, classData, matchClass, { transaction: t }),
                            generateEmail(res, matchEmail, template, matchClass, classData, { transaction: t }),
                        ])
                        .then(() => {
                            return exchange
                        })
                    }, { transaction: t })
                    .then((exchange) => exchange)
                })
                .catch((error) => next(error))
            } else {
                /*
                 * If no match is found, initiate new Exchange instance
                 * and set _class as classA
                 */
                return Exchange.create({ status: 'initiated', classAId: classId })
                .catch((error) => next(error))
            }
        })
        .catch((error) => next(error))
    })
    .then((exchange) => {
        /*
         * Refetch the exchange and exchanging class go get correct data
         * and formatting for frontend
         */
        exchange.getExchangeAndMatchClass(classId)
        .then((_exchange) => {
            res.send({
                exchange: _exchange
            });
        })
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        return next(error)
    })
});

/*
 * Route to verify exchange participation
 * Both classes must verify by the time verifyExchangeExpires expires
 * Notes: Here we could verify the expiration on the call or we could
 * run a cleanup function that voids all expired instances,
 * in which case the classes should be notified
 * If a one class has confirmed the exchange, that class will
 * be added to a new Exchnage instance as classA, and the
 * class that did not confirm will be removed (not belong to any
 * exchange)
 */

/*
 * Route /verify handles the following scenarios:
 * 1.   Verifies class, exchanging class not verified yet.
 *      Sends reminder to exchanging class.
 * 2.   Verifies class, exchanging class is already verified
 *      Sends emails to both saying exchange is ready
 * 3.   Verification link on exchange instance has expired
*/


// [TODO]
// CONSIDER DOING A TRANSACTION HERE
app.post('/verify', (req, res, next) => {
    const { classId, exchangeId } = req.body;
    let classRole, matchClassRole;
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
            classRole = _classRole;
            matchClassRole = classRole === 'A' ? 'B' : 'A';
            // Set class to verified = true
            const key = `class${_classRole}Verified`;
            exchange[ key ] = true;
            return exchange.save()
        })
        .then(exchange => {
            const { classAVerified, classBVerified } = exchange.dataValues;
            const _class = exchange.dataValues[`class${classRole}`].dataValues;
            const matchClass = exchange.dataValues[`class${matchClassRole}`].dataValues;
            const classEmail = _class.teacher.dataValues.email;
            const matchEmail = matchClass.teacher.dataValues.email;
            let template;

            if (classAVerified && classBVerified) {
                return exchange.setStatus('confirmed')
                .then(exchange => {
                    // Send email to both teachers to confirm match
                    template = 'matchConfirmed';
                    return Promise.all([
                        generateEmail(res, classEmail, template, _class, matchClass),
                        generateEmail(res, matchEmail, template, matchClass, _class)
                    ])
                    .then(() => exchange);
                })
            } else {
                // Send a reminder to the match class
                template = 'reminder';
                return generateEmail(res, matchEmail, template, matchClass, _class)
                .then(() => exchange);
            }
        })
        .then((exchange) => {
            /*
             * Refetch the exchange and match class go get correct data
             * and formatting for frontend
             */
            exchange.getExchangeAndMatchClass(classId)
            .then((_exchange) => res.send({ exchange: _exchange }));
        })
        .catch(error => {
            const defaultError = 'Something went wrong when initiating exchange.';
            error.defaultError = defaultError;
            return next(error);
        });
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        return next(error);
    });
});

module.exports = app;
