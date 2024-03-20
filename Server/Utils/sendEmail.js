const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const { hashStrting } = require('./jwt');
const emialVerification = require('../Models/emialVerification');

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;
console.log(AUTH_EMAIL);
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD
    },
});

const sendVerificationEmail = async (user, res) => {
    const { _id, email, lastname } = user;
    const token = _id + uuidv4();
    const link = APP_URL + "user/verify/" + _id + "/" + token;

    // Mail operations

    const mailOpreations = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<div style="margin: 0; padding: 0; width: 100%; font-family: Arial, sans-serif; font-size: 16px;">
        <div style="width: 100%; max-width: 600px; margin: auto; padding: 20px;">
            <div style="background-color: #007bff; color: #fff; text-align: center; padding: 10px;">
                <h1>Email Verification</h1>
            </div>
            <div style="padding: 20px; background-color: #f7f7f7;">
                <p>Hello, ${lastname}</p>
                <p>Please click the button below to verify your email address:</p>
                <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
                <p>If you didn't request this, you can ignore this email.</p>
            </div>
        </div>
    </div>`
    };
    try {
        const hashToken = await hashStrting(token);
        const newverification = await emialVerification.create({
            userId: _id,
            token: hashToken,
            createAt: Date.now(),
            expiresAt: Date.now() + 36000000,
        });
        if (newverification) {
            transporter.sendMail(mailOpreations).then(() => {
                res.status(201).json({
                    status: "success",
                    message: 'Verification email has been sent to your account. Check your email for further instructions.'
                });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" });
    }
};

module.exports = sendVerificationEmail;

