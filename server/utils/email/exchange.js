const { getCountryName } = require('../helpers');
const { sendEmail } = require ('./smtp');

const generateEmail = (res, recipient, template, classData, matchData) => {
    const content = generateTemplate(classData, matchData, template);
    const mailOptions = {
        to: recipient,
        from: process.env.MAIL_ID,
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
        },
        exchangeNotVerified: function() {
            const { name } = classData;
            const { firstName } = classData.teacher;
            // const { schoolName } = classData.school;

            return {
                subject: `Exchange for class ${name} has been cancelled`,
                html: `<div><h4>Dear ${firstName},</h4><br />We regret to tell you that the exchange for class ${name} has been cancelled because one of the participating classes did not verify the participation within one week.<br /><br />If you wish to initiate a new exchange for your class, please login to you profile <a href='app.wemakepeace.org'>here</a> Initiate the exchange for your class. Make sure that the term dates for when you want to participate is updated.</div>`
            };
        },
        exchangeCancelled: function() {
            const { name } = classData;
            const { firstName } = classData.teacher;
            // const { schoolName } = classData.school;

            return {
                subject: `Exchange for class ${name} has been cancelled`,
                html: `<div><h4>Dear ${firstName},</h4><br />We regret to tell you that the exchange for class ${name} has been cancelled. <br /><br /> This can be due to a number of reasons. <br /><br />If you wish to sign your class up again for a new exchange, please login to you profile here Initiate the exchange for your class. Make sure that the term dates for when you want to participate is updated.</div>`
            };
        }
    }
    return templates[ template ]();
};

module.exports = { generateEmail };
