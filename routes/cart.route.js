const express = require("express");
const router = new express.Router();
const Cart = require("../models/Cart");
const CryptoJS = require("crypto-js");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

////// Adding a cart (any logged in user)
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(201).send(savedCart);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Updating a cart (users only)
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).send(updatedCart);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Deleting a cart (users only)
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send("Video deleted successfully");
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting user cart (users only)
router.get("/search/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).send(cart);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting all carts (admin only)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).send(carts);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

module.exports = router;
