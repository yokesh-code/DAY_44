const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = express.Router();
const Register = require("../models/register")


router.route('/').post(async(req, res) => {
        try {
            let data = await Register.findOne({ email: req.body.email })
            if (data) {
                res.status(400).json({ message: "User already exists" });
            } else {
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
                await Register.create(req.body);
                res.status(200).json({ message: "Registration Successful" });
            }
        } catch (error) {
            console.log("error : " + error);
        }
    })

module.exports = router;