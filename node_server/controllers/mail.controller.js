const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { config } = require('dotenv');

config();

const { MAILGUN_USER, MAILGUN_PASS } = process.env
const transport = nodemailer.createTransport(
    smtpTransport({
        host: "smtp.mailgun.org",
        port: 587,
        auth: {
            user: MAILGUN_USER,
            pass: MAILGUN_PASS,
        },
    })
);

const sendEmail = async (data) => {
    const { from, to, subject, message, Cc, Bcc, attachments } = data;

    try {
        const email = {
            from,
            to,
            subject,
            html: message,
            // bcc: Bcc || null,
            // cc: Cc || null,
            // attachments: attachments || null
        };

        const info = await transport.sendMail(email);
        return {
            status: "Success",
            data: info,
            message: null,
        };
    } catch (error) {
        return {
            status: "Failure",
            message: error.message,
        };
    }
};

const sendMail = async (req, res) => {
    const { from, to, subject, message, Cc, Bcc, attachments } = req.body;
    try {
        const email = {
            from,
            to,
            subject,
            html: message,
        };

        const info = await transport.sendMail(email);

        res.status(201).json({
            status: "success",
            data: info,
        });
    } catch (e) {
        res.status(401).json({
            status: "failure",
            message: e.message,
        });
    }
};

module.exports = {
    sendEmail,
    sendMail,
};
