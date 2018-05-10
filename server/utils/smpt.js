const nodemailer = require('nodemailer');
const gmailUser = process.env.MAIL_ID;
const pass =  process.env.MAIL_PW;
const service = process.env.SERVICE;
const Email = require('email-templates');

const smtpTransport = nodemailer.createTransport({
    service: service,
    auth: {
        user: gmailUser,
        pass: pass
    }
});


const sendEmail = (res, mailOptions) => {
    return smtpTransport.sendMail(mailOptions);
};

module.exports = {
    sendEmail,
    smtpTransport
};
