const express = require('express');
const path = require('path');
const verifyEmail = require('../Controller/otpController');

const Router = express.Router();

Router.get("/verify/:token", verifyEmail);
Router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/verifiedpage.html'));
});

module.exports = Router;
