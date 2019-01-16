const app = require('express').Router();
const conn = require('../db/conn');
const cron = require('node-cron');
const { Exchange, Teacher, Class } = require('../db/index.js').models;
const { generateEmail } = require('../utils/email/exchange');
const { sendEmail } = require('../utils/email/smtp');

cron.schedule("* * * * *", function() {
    console.log("running a task every minute");
    const date = new Date();
    const expires = date.setDate(date.getDate() + 7);
    const alreadyExpired = date.setDate(date.getDate() - 8);

    Exchange.findOne({
        where: {
            status: 'pending',
            verifyExchangeExpires: {
                $lte: new Date()
            }
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
        .then(exchange => {
            // set exchange status to cancelled
            // set senderId and receiverId to null
            // set senderVerified and receiverVerified to null
            // send email to both teachers

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
                    .then((exchange) => exchange)
            })
        })
});

module.exports = app;
