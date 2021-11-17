const mongoose = require("mongoose");

const db = mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.debug("Connected to MongoDB successfully"))
    .catch((err) => console.error("Unable to connect to MongoDB", err));

module.exports = db;
