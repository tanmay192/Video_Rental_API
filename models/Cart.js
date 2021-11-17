const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        videos: [
            {
                videoId: { type: String },
                numberOfDays: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

// Compiling the schema to model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
