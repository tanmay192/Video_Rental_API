module.exports = function (app) {
    /*
     * Routes
     */
    app.use("/auth", require("./routes/auth.route"));
    app.use("/user", require("./routes/user.route"));
    app.use("/", require("./routes/root.route"));
};
