const { sendEmail } = require ('./smtp');

const generateEmail = (res, user, template) => {
    const content = generateTemplate(user, template);
    const mailOptions = {
        to: user.email,
        from: process.env.MAIL_FROM,
        ...content

    };

    return sendEmail(res, mailOptions)
};

const generateTemplate = (user, template) => {
    console.log('being called', user)
    const templates = {
        resetPassword: function() {
            const { firstName, email, link } = user;
            return {
                subject: `Reset password request`,
                html: `<div><h4>Reset Password Request</h4><br />You are receiving this because you (or someone else) have requested the reset of the password for your account.<br /><br />Please click on the following <a href=${link}>link</a> to complete the process.<br /><br />If you did not request this, please ignore this email and your password will remain unchanged.</div>`
            };
        },
        passwordChanged: function() {
            const { firstName, email } = user;
            return {
                subject: `Your password has been changed`,
                html: `<div><h4>Hello, ${firstName}</h4><br />This is a confirmation that the password for your We Make Peace portal account associated with ${email} has been changed.</div>`
            };
        }
    }

    return templates[ template ]();
}



module.exports = { generateEmail };



