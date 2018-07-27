const nodemailer = require('nodemailer');
const gmailUser = process.env.MAIL_ID;
const pass =  process.env.MAIL_PW;
const service = process.env.SERVICE;

const smtpTransport = nodemailer.createTransport({
    service: service,
    auth: {
        user: gmailUser,
        pass: pass
    }
});

const sendEmail = (res, mailOptions) => {
    return new Promise((resolve, reject) => {
        return smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                error.defaultError = 'Something went wrong when. Please try again.';
                reject(error)
            }
            resolve(response)
        });
    })
};

module.exports = {
    sendEmail,
    smtpTransport
};
