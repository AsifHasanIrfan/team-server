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
const send_mail = async (requestId, recipient, fullName, newPass) => {

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
    from: "Asif <asifhasanirfan@gmail.com>",
    to: recipient,
    subject: "Password reset request from Team",
    html: `<h1>Hello ${fullName}</h1>
      <p>You have request your password. We take time to process the issue and here we approved your request and sending you the new password. Please, try to remember your password.</p>
      <h4>Your new password is: <span style='color: red'>${newPass}</span></h4>
      `,
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
