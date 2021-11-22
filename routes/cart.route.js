const express = require("express");
const router = new express.Router();
const Video = require("../models/Video");
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
router.get("/:id", async (req, res) => {
    try {
        const cart = await Video.findById(req.params.id);
        res.status(200).send(video);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

// ////// Getting videos (any)
// router.get("/", async (req, res) => {
//     const qCategory = req.query.category;
//     const qTitle = req.query.title;
//     try {
//         let videos;
//         if (qCategory) {
//             videos = await Video.find({
//                 categories: {
//                     $in: [qCategory],
//                 },
//             });
//         } else if (qTitle) {
//             videos = await Video.find({
//                 title: qTitle,
//             });
//         } else {
//             videos = await Video.find();
//         }
//         res.status(200).send(videos);
//     } catch (err) {
//         return res.status(500).send({
//             error: err || "Something went wrong.",
//         });
//     }
// });

module.exports = router;
