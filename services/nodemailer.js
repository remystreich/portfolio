const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({  
    host: 'smtp.gmail.com',
    port: 587, // 587 -> TLS & 465 -> SSL
    auth: {  
      user: process.env.USERMAIL, // email de votre votre compte google
      pass: process.env.PASSMAIL// password de votre compte google
    }  
  });

  module.exports = transporter;