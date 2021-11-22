const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

////// User details update (users only)
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SEC_PASS
        ).toString();
    }

    if (req.body.isAdmin) {
        return res.status(403).send("You don't have the appropriate rights");
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).send(updatedUser);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// User delete (users only)
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted successfully");
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting a user (admin only)
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...userDetails } = user._doc;

        res.status(200).send(userDetails);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting all users (admin only)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find();
        let usersList = [];
        for (let user of users) {
            const { password, ...userDetails } = user._doc;
            usersList.push(userDetails);
        }
        res.status(200).send(usersList);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

module.exports = router;
