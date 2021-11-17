const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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

        amount: {
            type: Number,
            require: true,
        },
        address: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);

// Compiling the schema to model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
