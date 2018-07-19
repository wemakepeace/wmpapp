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
const { extractDataForFrontend } = require('../utils/helpers');
const { sendEmail, generateEmailAdvanced } = require('../utils/smpt');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
// const { findFurthestMatch } = require('../utils/findExchangeMatch');

/*
 * Handles the following cases:
 * One match is found - updates exchange instance returns exchange and matchingClass
 * Multiple matches are found - finds furthest match, updates exchange instance
 * and return exchange and matchingClass
 * No match is found - Initiates new exchange and returns exchange
*/

app.post('/', (req, res, next) => {
    const { classId } = req.body;

    // fetch class
    Class.findOne({
        where: { id: classId },
        include: [
            School,
            Teacher
        ]
    })
    .then(_class => {
        return Exchange.findMatch(_class)
        .then(exchange => {
            // If matches are found
            if (exchange) {
                    return conn.transaction((t) => {
                        // if match was found, _class will have classRole B
                        return exchange.setClassB(_class, { transaction: t })
                        .then(exchange => exchange.setStatus('pending', t))
                        .then(exchange => exchange.setVerificationExpiration(t))
                        .then(exchange => {
                            // at this point exchange.classA will be the matching class
                            const classData = _class.dataValues;
                            const exchangeClassData = exchange.dataValues.classA.dataValues;
                            const classEmail = classData.teacher.dataValues.email;
                            const exchangeClassEmail = exchangeClassData.teacher.dataValues.email;
                            return Promise.all([
                                generateEmailAdvanced(res, classEmail, 'verify', classData, { transaction: t }),
                                generateEmailAdvanced(res, exchangeClassEmail, 'verify', exchangeClassData, { transaction: t }),
                            ])
                            .then(() => {
                                return exchange
                            })
                        }, { transaction: t })
                        .then((exchange) => exchange)
                })
                .catch((error) => next(error))
            } else {
                // f no match is found initiate new Exchange instance
                return Exchange.create({ status: 'initiated', classAId: classId })
                .catch((error) => next(error))
            }
        })
        .catch((error) => next(error))
    })
    .then((exchange) => {
        /* refetch the exchange and exchanging class go get correct data
         * and formatting for frontend */
        exchange.getExchangeAndExchangingClass(classId)
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

/* Route to verify exchange participation
 * Both classes must verify by the time verifyExchangeExpires expires
 * Notes: Here we could verify the expiration on the call or we could run a cleanup function
 * that voids all expired instances, in which case the classes should be notified
 * If a one class has confirmed the exchange, that class will be added to a new Exchnage
 * instance as classA, and the class that did not confirm will be removed (not belong to any
 * exchange) */


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
