const express = require("express");
const router = new express.Router();
const Order = require("../models/Order");
const CryptoJS = require("crypto-js");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

////// Creating an order (users only)
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Updating an order (admin only)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).send(updatedOrder);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Deleting an order (admin only)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).send("Order deleted successfully");
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting user orders (users only)
router.get("/search/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.params.userId });
        res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting all orders (admin only)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

module.exports = router;
