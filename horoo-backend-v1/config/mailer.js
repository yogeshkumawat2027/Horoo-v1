const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("APP PASSWORD EXISTS:", !!process.env.EMAIL_APP_PASSWORD);

module.exports = transporter;