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
    return smtpTransport.sendMail(mailOptions);
};

//  const sendEmail = (res, mailOptions) => {
//     return smtpTransport.sendMail(mailOptions, function(error, response){
//          if (error) {
//             console.log(error);
//             res.end("error");
//          } else {
//             // console.log('response from smpt transport', response)
//             // console.log("Message sent: " + response.message);
//             res.end("sent");
//         }
//     });
// };

module.exports = {
    sendEmail,
    smtpTransport
};
