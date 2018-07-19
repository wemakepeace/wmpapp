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

const generateEmailAdvanced = (res, recipient, template, classData, matchData) => {
    const content = generateTemplate(classData, matchData, template);
    const mailOptions = {
        to: recipient,
        from: process.env.MAIL_FROM,
        ...content

    };

    return sendEmail(res, mailOptions)
}

const generateTemplate = (classData, matchData, template) => {
    const templates = {
        reminder: function() {
            return {
                subject: "Reminder to confirm Peace Letter Participation for " + classData.name,
                text: "Great news! The " + matchData.name + " from " + matchData.school.country + "has confirmed their participation in the Peace Letter Exchange and is ready to begin writing letters with your class. We are currently awaiting your class' confirmaiton. \n\n" + "Please login to your account and confirm by [date of expiration]!"
            }
        },
        verify: function() {
            return {
                subject: 'Verify Exchange Participation for ' + classData.name + ' | We Make Peace',
                text: "You are receiving this because your class has been matched with another class!\n\n" + "Please login and confirm your class' participation within 7 days.\n\n"
            }
        }
    }
    return templates[ template ]();
}



module.exports = {
    sendEmail,
    smtpTransport,
    generateEmailAdvanced
};
