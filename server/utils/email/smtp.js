const nodemailer = require('nodemailer');
const mailId = process.env.MAIL_ID;
const pass =  process.env.MAIL_PW;
const host = process.env.MAIL_HOST;

const wmpConfig = {
    pool: true,
    host: host,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: mailId,
        pass: pass
    }
};

const smtpTransport = nodemailer.createTransport(wmpConfig);

const sendEmail = (res, mailOptions) => {
    return new Promise((resolve, reject) => {
        return smtpTransport.sendMail(mailOptions, function(error, response) {

            if (error) {
                console.log('error', error);
                error.defaultError = 'Something went wrong when. Please try again.';
                reject(error);
            }
            console.log('response', response);
            resolve(response);
        });
    });
};

module.exports = {
    sendEmail,
    smtpTransport
};
