const express = require('express');
const nodemailer = require('nodemailer');
const createContactEndpoint = require('./contact-endpoint.cjs');

const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_FROM', 'CONTACT_TO'];
const missing = required.filter((name) => !process.env[name]?.trim());
if (missing.length) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}`);
}

const smtpPort = Number(process.env.SMTP_PORT);
if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
  throw new Error('SMTP_PORT must be a valid port number.');
}

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  requireTLS: smtpPort !== 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const app = express();
app.use('/api/contact', createContactEndpoint({
  allowedOrigin: process.env.CONTACT_ORIGIN || 'https://ktite.me',
  recipient: process.env.CONTACT_TO,
  sendMail: ({ to, replyTo, subject, text }) =>
    transport.sendMail({ from: process.env.CONTACT_FROM, to, replyTo, subject, text }),
}));

const port = Number(process.env.PORT || 4000);
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Contact API listening on port ${port}`);
});
