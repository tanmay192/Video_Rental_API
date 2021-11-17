const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
    res.send("user test is successful");
});

module.exports = router;
