const app = require('express').Router();
const { models, conn } = require('../db/index.js');
const Teacher = models.Teacher;
const Class = models.Class;
const Exchange = models.Exchange;
const { generateEmail } = require('../utils/email/exchange');
const { feedback } = require('../utils/feedback');
const { extractDataForFrontend } = require('../utils/helpers');
const { sendEmail } = require('../utils/email/smtp');
const { SUCCESS } = require('../constants/feedbackTypes');
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

                    const mailOptions = {
                        to : updatedUser.email,
                        from: process.env.MAIL_ID,
                        firstName: updatedUser.firstName,
                        subject : "Your password has been changed",
                        html : "Hello " + updatedUser.firstName + ",<br> This is a confirmation that the password for your We Make Peace portal account " + updatedUser.email + " has been changed."
                    }

                    return sendEmail(res, mailOptions)
                    .then(() => {
                        res.send({
                            user: updatedUser,
                            feedback: feedback(SUCCESS, ['Your password has been reset.'])
                        });
                    });

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

// deletes teacher and all classes and exchanges that are associated with teacher
// notify both teachers of any deleted

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
                // fetch basic exchange and class data for all classes involved in exchange
                // delete exchange instance
                return Promise.all(_exchanges.map((exchange) => {
                    let exchangeData;
                    if (!exchange || !exchange.length) {
                        return null;
                    }
                    return exchange[0].getBasicInfo(t)
                    .then((data) => {
                        exchangeData = data;
                        return exchange[0].destroy({ transaction: t })
                    })
                    .then(() => exchangeData)
                }))
                .then((_result) => {
                    // extract exchange / class info and remove any duplicate info
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
                    // delete all classes affiliated with teacher
                    // delete teacher
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
                    //  send email to to both teachers involved in the cancelled exchanges
                    const template = 'exchangeCancelled';
                    return Promise.all(result.map(data => {
                        return generateEmail(res, data.teacher.email, template, data, null, { transaction: t })
                    }))
                })
                .then(() => {
                    res.send({
                        feedback: {
                            type: 'deleted',
                            messages: ['Account deleted.']
                        }
                    })
                })
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

app.post('/support', (req, res, next) => {
   const { exchange, currentClass, teacher, message, title } = req.body;
   const mailOptions = {
        to: process.env.MAIL_ID,
        from: process.env.MAIL_ID,
        subject: 'SUPPORT MESSAGE',
        html:
            `Teacher id: ${teacher.id}<br />
            email: ${teacher.email}<br />
            Class id: ${currentClass.id}<br />
            Exchange id: ${exchange && exchange.id}<br />
            Title: ${title}<br />
            Message: ${message}`
    }

    return sendEmail(res, mailOptions)
    .then(() => {
        res.send({
            feedback: feedback(SUCCESS, ['Your message has been sent.'])
        });
    })
    .catch((error) => {
        const defaultError = 'Something went wrong when sending your message';
        error.defaultError = defaultError;
        next(error);
    });
});

module.exports = app;
