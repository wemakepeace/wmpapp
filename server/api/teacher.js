const app = require('express').Router();
const { models, conn } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const Exchange = models.Exchange;
const { generateEmail } = require('../utils/email/exchange');
const { feedback } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { sendEmail } = require('../utils/email/smtp');
const { SUCCESS, ERROR } = require('../constants/feedbackTypes');
const {
    pbkdf2,
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

app.delete('/', (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const teacherId = decodeToken(token);

    Class.findAll({ where: { teacherId } })
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
                // remove sender and receiver on exchange instances
                // fetch basic exchange and class data for all classes involved in exchange
                return Promise.all(_exchanges.map((exchange) => {
                    if (!exchange || !exchange.length) {
                        return null;
                    }

                    return exchange[0].setStatus('cancelled', t)
                    .then(_exchange => _exchange.setReceiver(null, { transaction: t }))
                    .then(_exchange => _exchange.setSender(null, { transaction: t }))
                    .then(_exchange => _exchange.getBasicInfo(t))
                }))
                .then((_result) => {
                    // extract info and remove any duplicate
                    return _result.reduce((collection, current) => {
                        if (current) collection = collection.concat(current);
                        return collection;
                    }, [])
                    .reduce((collection, current ) => {
                        const dataExistsInCollection = collection.some(({ teacher: { email }}) => {
                            return email === current.teacher.email
                        });

                        if (!dataExistsInCollection) {
                            collection = collection.concat(current);
                        }
                        return collection;

                    }, []);
                })
                .then((result) => {
                    return Class.deleteByTeacherId(teacherId, t)
                        .then(() => {
                            return Teacher.destroy({
                                where: { id: teacherId },
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
                    .then(() => res.send({ feedback: { type: 'deleted', messages: ['Account deleted.'] }}))
                })// end of transaction
                .catch(error => {
                    error.defaultError = 'Something went wrong when deleting your profile. Please try again.';

                    next(error);
                });
            });
    })
    .catch((error) => {
        error.defaultError = 'Something went wrong when deleting your profile. Please try again.';
        next(error);
    });

});


module.exports = app;
