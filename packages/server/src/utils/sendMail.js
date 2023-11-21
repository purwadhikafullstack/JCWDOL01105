// utils/sendMail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    verifyUrl: process.env.CLIENT_URL,
  },
});

function generateVerificationCode() {
  return (code = Math.floor(1000 + Math.random() * 90000).toString());
}
async function mailVerificationCode(email, verification_code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Verification',
    html: `
    <h1>Hello, thanks for signing up</h1>
    <img src="https://i.pinimg.com/564x/00/bc/64/00bc646eba01f2004c4a4f8c40881fdf.jpg" alt="Your Image" />
    <br />
      <a href="${process.env.CLIENT_URL}/user/verify/">Verify Your Account</a>
    <br />
    Your verification code is: ${verification_code}

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  generateVerificationCode,
  mailVerificationCode,
};