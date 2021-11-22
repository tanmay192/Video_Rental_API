const express = require("express");
const router = new express.Router();
const Video = require("../models/Video");
const CryptoJS = require("crypto-js");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

////// Adding a video (admin only)
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newVideo = new Video(req.body);

    try {
        const savedVideo = await newVideo.save();
        res.status(201).send(savedVideo);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Updating details of a video (admin only)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).send(updatedVideo);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Deleting a video (admin only)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).send("Video deleted successfully");
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting details of a video (any)
router.get("/:id", async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).send(video);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

////// Getting videos (any)
router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    const qTitle = req.query.title;
    try {
        let videos;
        if (qCategory) {
            videos = await Video.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else if (qTitle) {
            videos = await Video.find({
                title: qTitle,
            });
        } else {
            videos = await Video.find();
        }
        res.status(200).send(videos);
    } catch (err) {
        return res.status(500).send({
            error: err || "Something went wrong.",
        });
    }
});

module.exports = router;
