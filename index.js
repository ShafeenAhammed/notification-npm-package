const nodemailer = require('nodemailer');
const twilio = require('twilio');

// sending otp using nodemailer
function sendEmail(to, subject, text, config) {
  const transporter = nodemailer.createTransport({
    service: config.service, //eg: gmail
    auth: {
      user: config.user, // eg: user@gmail.com
      pass: config.password,
    },
  });

  // Send email
  const mailOptions = {
    from: config.user,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

// sending otp using twilio
function sendOTP(to, otp, config) {
  // Twilio setup
  const accountSid = config.accountSid;
  const authToken = config.authToken;
  const client = new twilio(accountSid, authToken);

  return client.messages.create({
    body: `Your OTP is: ${otp}`,
    to,
    from: config.from,
  });
}

module.exports = {
    sendOTP,
    sendEmail,
};

