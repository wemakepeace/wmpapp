const app = require('express').Router();
const conn = require('../db/conn');
const cron = require('node-cron');
const { Exchange, Teacher, Class } = require('../db/index.js').models;
const { generateEmail } = require('../utils/email/exchange');
const { sendEmail } = require('../utils/email/smtp');




/*
 * Find all classes that have pending exchanges and have not yet confirmed and has not
 * been reminded yet and if it is more than 3 days since match was made send email to
 * remind unconfirmed teacher
 *
 */

cron.schedule('0 0 0 * * *', function() {
    Exchange.findAll({
        where: {
            status: 'pending',
            emailReminderSent: false
        }
    })
    .then(exchanges => {

    });
});




/*
 * Job runs every day at midnight
 * will cancel all pending exchanges that has not been confirmed by both teacher before the
 * verifyExchangeExpires date stamp has expired (7 days)
 */

/*
 * verify the expiration on the call or we could
 * run a cleanup function that voids all expired instances,
 * in which case the classes should be notified
 * If a one class has confirmed the exchange, that class will
 * be added to a new Exchnage instance as "sender", and the
 * class that did not confirm will be removed (not belong to any
 * exchange)
 */


cron.schedule('*/2 * * * *', function() {

    const date = new Date();
    const expires = date.setDate(date.getDate() + 7);
    const alreadyExpired = date.setDate(date.getDate() - 8);

    Exchange.findAll({
        where: {
            status: 'pending',
            sendReminderDate: { $eq: new Date() }
	},
        include: [
            {
                model: Class,
                as: 'sender',
                include: [ Teacher ]
            },
            {
                model: Class,
                as: 'receiver',
                include: [ Teacher ]
        }]
    })
    .then(exchanges => {
        // set exchange status to cancelled
        // set senderId and receiverId to null
        // set senderVerified and receiverVerified to null
        // send email to both teachers
        // send email to WMP to notify about cancelled exchange

        Promise.all(exchanges.map(exchange => {
            return conn.transaction((t) => {
                exchange.status = 'cancelled';
                exchange.senderId = null;
                exchange.receiverId = null;
                exchange.receiverVerified = false;
                exchange.senderVerified = false;
                exchange.verifyExchangeExpires = null;
                return exchange.save({ transaction: t })
                .then((exchange) => {
                    const senderClass = exchange.dataValues.sender.dataValues;
                    const senderEmail = senderClass.teacher.dataValues.email;
                    const receiverClass = exchange.dataValues.receiver.dataValues;
                    const receiverEmail = receiverClass.teacher.dataValues.email;
                    const template = 'exchangeNotVerified';
                    const mailOptionsToWMP = {
                        to : process.env.MAIL_ID,
                        from: process.env.MAIL_ID,
                        subject : "An exchange has been cancelled",
                        html : `Exchange cancelled for exchange with ID ${exchange.dataValues.id}`
                    };

                    return Promise.all([
                        generateEmail(null, senderEmail, template, classData=senderClass, { transaction: t }),
                        generateEmail(null, receiverEmail, template, classData=receiverClass, { transaction: t }),
                        sendEmail(null, mailOptionsToWMP)
                    ])
                    .then(() => {
                        return exchange
                    })
                }, { transaction: t })
                .catch((error) => {
                    throw new Error(error)
                })
            });
        }));
    });
});

module.exports = app;
