const jwt = require("jsonwebtoken");

// middleware auth
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT);
        const user_id = decodedToken.user_id;
        const admin = decodedToken.admin;
        if (admin === true) {
            next();
        } else if (req.body.user_id && req.body.user_id === user_id) {
            next();
        } else if (
            JSON.parse(req.body.user.user_id) &&
            JSON.parse(req.body.user.user_id) == user_id
        ) {
            next();
        } else if (req.body.post.user_id && req.body.post.user_id == user_id) {
            next();
        } else {
            throw "Invalid user ID";
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
