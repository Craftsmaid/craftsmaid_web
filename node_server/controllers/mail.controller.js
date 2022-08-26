const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(
    smtpTransport({
        host: "smtp.mailgun.org",
        port: 587,
        auth: {
            user: "postmaster@mail.trails247.com",
            pass: "96c84cc91464a2ca87be551e4f5e5134-162d1f80-6ed9a45f",
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
