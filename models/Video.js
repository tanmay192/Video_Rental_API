const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        creator: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        categories: { type: Array },
        length: { type: Number },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

// Compiling the schema to model
const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
