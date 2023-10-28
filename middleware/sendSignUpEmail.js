// external imports
require("dotenv").config();
const nodemailer = require('nodemailer');

// internal imports
const { 
    MAILER_HOST,
    MAILER_USERNAME,
    MAILER_PASSWORD, 
} = require("../env");

// auth middleware
const send_mail = async (recipient, fullName, username, password) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        // host: MAILER_HOST,
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: MAILER_USERNAME,
            pass: MAILER_PASSWORD,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });


    const mailOptions = {
        from: "Team <asifhasanirfan@gmail.com>",
        to: recipient,
        subject: 'Account created from Team',
        html: `<h1>Hello ${fullName}</h1>
      <p>You have request your account. We take time to process the issue and here we approved your request and sending you the Team account. </p>
      <h4>Your account username: <span style='color: red'>${username}</span></h4>
      <h4>Your account password: <span style='color: red'>${password}</span></h4> 
      `
    };

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
            transporter.sendMail(mailOptions, function async(error, info) {
                if (error) {
                    console.log(error, 'mail');
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });

   
}

module.exports = send_mail;
