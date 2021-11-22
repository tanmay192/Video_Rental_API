module.exports = function (app) {
    /*
     * Routes
     */
    app.use("/cart", require("./routes/cart.route"));
    app.use("/videos", require("./routes/video.route"));
    app.use("/auth", require("./routes/auth.route"));
    app.use("/users", require("./routes/user.route"));
    app.use("/", require("./routes/root.route"));
};
