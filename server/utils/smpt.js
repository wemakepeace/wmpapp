const nodemailer = require('nodemailer');
const gmailUser = process.env.MAIL_ID;
const pass =  process.env.MAIL_PW;
const service = process.env.SERVICE;
const Email = require('email-templates');
const { getCountryName } = require('./helpers');

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

const generateEmail = (res, recipient, template, classData, matchData) => {
    const content = generateTemplate(classData, matchData, template);
    const mailOptions = {
        to: recipient,
        from: process.env.MAIL_FROM,
        ...content

    };

    return sendEmail(res, mailOptions)
};

const generateTemplate = (classData, matchData, template) => {
    const templates = {
        matchConfirmed: function() {
            const country = getCountryName(matchData.school.country);
            const { name } = classData;
            const exchangeClassName = matchData.name;
            return {
                subject: `Class ${name} is ready to begin Peace Letter Exchange!`,
                html: `<div><h2>Great News!</h2><br />Class ${name} is now ready to begin exchanging Letters with class ${exchangeClassName} from ${country}.<br /><br />Please login and follow the next steps.</div>`
            };
        },
        reminder: function() {
            const { name } = classData;
            const country = getCountryName(matchData.school.country);
            const exchangeClassName = matchData.name;

            return {
                subject: `Reminder to confirm Peace Letter Exchange Participation for class ${name}`,
                html: `<div><h2>Great news!</h2><br /> Class ${exchangeClassName} from ${country} has confirmed their participation in the Peace Letter Exchange and is ready to begin writing letters with your class. <br /><br />We are currently awaiting your class' confirmaiton. <br /> Please login to your account and confirm your participation!</div>`
            };
        },
        verify: function() {
            const { name } = classData;
            const country = getCountryName(matchData.school.country);
            const exchangeClassName = matchData.name;

            return {
                subject: `Class ${name} has been matched with a class from ${country}!`,
                html: `<div><h2>Great News!</h2>You are receiving this because class ${name} has been matched with class ${exchangeClassName} from ${country}!<br /><br />Please login and confirm your class' participation within 7 days.</div>`
            };
        }
    }
    return templates[ template ]();
}



module.exports = {
    sendEmail,
    smtpTransport,
    generateEmail
};
