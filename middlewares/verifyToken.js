const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(403).send("Invalid Token");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).send("You are not authenticated");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res
                .status(403)
                .send("You don't have the appropriate rights");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res
                .status(403)
                .send("You don't have the appropriate rights");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
