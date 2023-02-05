const nodemailer = require('nodemailer');
const logger = require('./logger');

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});
// verify connection configuration
transport.verify((error) => {
  if (error) {
    logger.error('error with email connection', error);
  }
});

const sendMail = (to, subject, template) => new Promise((resolve, reject) => {
  transport.sendMail(
    {
      from: `Ropstam Test<${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html: template,
    },
    (err, info) => {
      if (err) {
        logger.error('Error while sending out the email', err);
        reject(new Error('Error while sending out the email'));
      }
      logger.info(info);
      resolve(info);
    },
  );
});
module.exports = sendMail;
