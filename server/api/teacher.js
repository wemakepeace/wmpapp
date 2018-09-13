const app = require('express').Router();
const { models, conn } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const Exchange = models.Exchange;
const School = models.School;
const { feedback } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { sendEmail, smtpTransport } = require('../utils/email/smtp');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const {
    pbkdf2,
    saltHashPassword,
    createToken,
    decodeToken,
    validatePassword
} = require('../utils/security');

app.get('/', (req, res, next) => {
    /* Have to verify that this is secure .... */
    const token = req.headers.authorization.split('Bearer ')[1];
    const id = decodeToken(token);

    return Teacher.getTeacherAndAssociations(id)
        .then((teacher) => {
            if (!teacher){
                const defaultError =  'No profile found.';
                return next({ defaultError });
            }
            res.send({
                feedback: feedback(SUCCESS, []),
                teacher
            });
        })
        .catch(error => {
            error.defaultError = 'Something went wrong when loading your session. Please login.';
            return next(error);
        });
});


app.put('/', (req, res, next) => {
    const data = req.body;
    const { id } = data;

    Teacher.findById(id)
    .then(user => {

        for (var key in data) {
            user[ key ] = data[ key ];
        }

        user.save()
            .then(updatedUser => {
                updatedUser = updatedUser.dataValues;
                res.send({
                    feedback: feedback(SUCCESS, ['Your information has been saved.']),
                    teacher: extractDataForFrontend(updatedUser, {})
                })
            })
            .catch(error => {
                error.defaultError = 'Something went wrong when updating your profile.';
                return next(error);
            })
    })
    .catch(error => {
        error.defaultError = 'Something went wrong when updating your profile.';
        return next(error);
    })
});


app.put('/changepassword', (req, res, next) => {
    const { password, confirmPassword, oldPassword } = req.body;
    const token = req.headers.authorization.split('Bearer ')[1];
    const id = decodeToken(token);

    if (!password || !confirmPassword || !oldPassword) {
        return next({ defaultError: 'You have to fill in all fields to change password.'})
    }

    Teacher.findById(id)
        .then(user => {
            const hashTest = pbkdf2(oldPassword, user.salt);

            if (hashTest.passwordHash === user.password) {
                const errorMessage = validatePassword(password, confirmPassword);

                if (errorMessage) {
                    return next({ defaultError: errorMessage });
                }

                user.password = password;

                user.save()
                .then((updatedUser) => {

                    updatedUser.destroyTokens();

                    const mailOptionsVerifyPwChange = {
                        to : updatedUser.email,
                        from: process.env.MAIL_ID,
                        firstName: updatedUser.firstName,
                        subject : "Your password has been changed",
                        html : "Hello " + updatedUser.firstName + ",<br> This is a confirmation that the password for your We Make Peace portal account " + updatedUser.email + " has been changed."
                    }

                    sendEmail(res, mailOptionsVerifyPwChange)

                    res.send({
                        user:updatedUser,
                        feedback: feedback(SUCCESS, ['Your password has been reset.'])
                    })
                })
                .catch(error => {
                    error.defaultError = 'Internal server error. Please try resetting your password  again.';;
                    return next(error);
                });
            }
            else {
                const defaultError = "Password is incorrect.";
                return next({ defaultError });
            }
        });
});


app.post('/logout', (req, res, next) => {
    const { id } = req.body;
    Teacher.findById(id)
    .then(user => user.destroyTokens())
});

// should delete teacher and all classes that are associated with teacher
// this will automatically cancel all active exchanges

const { generateEmail } = require('../utils/email/exchange');

app.delete('/', (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const teacherId = decodeToken(token);


    Class.findAll({
        where: { teacherId }
    })
    .then((classes) => {

        return Promise.all(classes.map((_class) => {
            return Exchange.findAll({
                where: {
                    $or: [ { status: { $ne: 'completed' } }, { status: { $ne: 'cancelled' } } ],
                    $or: [ { senderId: { $eq: _class.id } }, { receiverId: { $eq: _class.id } } ]
                }
            })
            .then(exchanges => exchanges)
        }))
        .then((_exchanges) => {
            conn.transaction((t) => {
                // set Exchange status to cancelled
                // fetch basic exchange and class data for all classes involved in exchange
                return Promise.all(_exchanges.map((exchange) => {
                    if (!exchange || !exchange.length) {
                        return null;
                    }

                    return exchange[0].setStatus('cancelled', t)
                    .then(_exchange => _exchange.getBasicInfo(t))
                }))
                .then((_result) => {
                    // extract info and remove any duplicate
                    return _result.reduce((coll, curr) => {
                        if (curr) coll = coll.concat(curr);
                        return coll;
                    }, [])
                    .reduce((coll, curr) => {

                        if (!coll.some(({ teacher: { email }}) => email === curr.teacher.email)) {
                            coll = coll.concat(curr)
                        }
                        return coll
                    }, []);
                })
                .then((result) => {
                    return Class.deleteByTeacherId(teacherId, t)
                        .then(() => {
                            return Teacher.destroy({
                                where: {
                                    id: teacherId
                                },
                                transaction: t
                            })
                        })
                        .then(() => result)
                    })
                    .then((result) => {
                          const template = 'exchangeCancelled';
                            return Promise.all(result.map(data => {
                                return generateEmail(res, data.teacher.email, template, data, null, { transaction: t })
                            }))
                        })
                        .then(success => res.send({ feedback: { type: SUCCESS, messages: ['Account deleted.']}}))
                    })// end of t
                    // delete teacher
                    // delete classes affiliated with teacher id

                    // send email to both teachers affiliated with the exchanges the teacher has been in charge of
            })

    })

    // include: [{
    //     model: Exchange,
    //     as: 'sender',
    //     where: {
    //         $or: [
    //             {
    //                 status: { $ne: 'completed' },
    //             },
    //             {
    //                 status: { $ne: 'cancelled' }
    //             }
    //         ]
    //     }
    // }]


    // first find all classes
    // then find all exchanges
        // set all exchanges to cancelled if not completed
        // send an email to other teachers
            // Dear [name],
            // We regret to reform you that class [class] from [school] has opted out of the exchange.
            // If you wish to sign your class up again for a new exchange, please login to you profile here Initiate the exchange for your class. Make sure that the term dates for when you want to participate is updated.
        // delete classes
        // delete teacher
});


module.exports = app;
