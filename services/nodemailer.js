const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({  
    host: 'smtp.gmail.com',
    port: 587, // 587 -> TLS & 465 -> SSL
    auth: {  
      user: process.env.USERMAIL,
      pass: process.env.PASSMAIL,
    }  
  });

  module.exports = transporter;