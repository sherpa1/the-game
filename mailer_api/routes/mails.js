const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'maildev',
    port: 25,
    // We add this setting to tell nodemailer the host isn't secure during dev:
    ignoreTLS: true
});

router.post('/', async (req, res, next) => {


    // Now when your send an email, it will show up in the MailDev interface
    transporter.sendMail({ /* from, to, etc... */ }, (err, info) => { /* ... */ });
});

module.exports = router;