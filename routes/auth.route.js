const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

////// New user registeration
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// User login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(401).send("User not found");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SEC_PASS
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (req.body.password !== originalPassword)
            res.status(401).send("Wrong Credentials entered");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        // Sending user details except the original password, to the front end
        const { password, ...userDetails } = user._doc;
        res.status(200).send({ ...userDetails, accessToken });
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

module.exports = router;
