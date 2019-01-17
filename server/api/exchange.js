const app = require('express').Router();
const conn = require('../db/conn');
const { models } = require('../db');
const Class = models.Class;
const School = models.School;
const Teacher = models.Teacher;
const Exchange = models.Exchange;
const { generateEmail } = require('../utils/email/exchange');

/*
 * Handles following cases:
 *      1. One match is found:
 *      Updates exchange instance returns exchange and matchClass
 *      2. Multiple matches are found:
 *      Finds furthest match, updates exchange instance and returns exchange and matchClass
 *      3.No match is found:
 *      Initiates new exchange, sets class to "sender" and returns exchange
 */

app.post('/', (req, res, next) => {
    const { classId } = req.body;

    Class.findOne({
        where: { id: classId },
        attributes: ['id', 'name', 'teacherId', 'schoolId', 'termId', 'ageGroupId', 'size'],
        include: [ { model: Teacher, attributes: [ 'id', 'email' ] }, School ]
    })
    .then((_class) => {
        return Exchange.findMatch(_class)
        .then((exchange) => {
            // If match is found, _class will have classRole = 'receiver'
            if (exchange) {
                return conn.transaction((t) => {
                    return exchange.setReceiver(_class, { transaction: t })
                    .then((exchange) => exchange.setStatus('pending', t))
                    .then((exchange) => exchange.setVerificationExpiration(t))
                    .then((exchange) => {
                        // At this point exchange.sender will be the matching class
                        const classData = _class.dataValues;
                        const matchClass = exchange.dataValues.sender.dataValues;
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
                 * and set _class as sender
                 */
                return Exchange.create({ status: 'initiated', senderId: classId })
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
        .then((_exchange) => res.send({ exchange: _exchange }));
    })
    .catch(error => {
        const defaultError = 'Something went wrong when initiating exchange.';
        error.defaultError = defaultError;
        return next(error)
    })
});



/*
 * Route to verify exchange participation
 * Both classes must verify by the time verifyExchangeExpires expires (7 days)
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
            $or: [{ senderId: classId }, { receiverId: classId }]
        },
        include: [
            {
                model: Class,
                as: 'sender',
                include: [ School, Teacher ]
            },
            {
                model: Class,
                as: 'receiver',
                include: [ School, Teacher ]
        }]
    })
    .then(exchange => {
        return exchange.getClassRole(classId)
        .then((_classRole) => {
            classRole = _classRole;
            matchClassRole = classRole === 'sender' ? 'receiver' : 'sender';
            // Set class to verified = true
            const key = `${_classRole}Verified`;
            exchange[ key ] = true;
            return exchange.save()
        })
        .then(exchange => {
            const { senderVerified, receiverVerified } = exchange.dataValues;
            const _class = exchange.dataValues[ classRole ].dataValues;
            const matchClass = exchange.dataValues[ matchClassRole ].dataValues;
            const classEmail = _class.teacher.dataValues.email;
            const matchEmail = matchClass.teacher.dataValues.email;
            let template;

            if (senderVerified && receiverVerified) {
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
