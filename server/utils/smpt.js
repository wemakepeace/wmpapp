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

const generateEmailAdvanced = (res, recipient, templateName, classData, matchData) => {
    const content = generateTemplate(classData, matchData, templateName)
    const mailOptions = {
        to: recipient,
        from: "tempwmp@gmail.com",
        ...content

    };

    return sendEmail(res, mailOptions)
}

const generateTemplate = (classData, matchData, templateName) => {
    const templates = {
        reminder: {
            subject: "Reminder to confirm Peace Letter Participation for " + classData.name,
            text: "Great news! The " + matchData.name + " from " + matchData.school.country + "has confirmed their participation in the Peace Letter Exchange and is ready to begin writing letters with your class. We are currently awaiting your class' confirmaiton. \n\n" + "Please confirm by [date of expiration]!"

        }
    }

    return templates[ templateName ]

}



module.exports = {
    sendEmail,
    smtpTransport,
    generateEmailAdvanced
};
