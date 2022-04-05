const jwt = require("jsonwebtoken");

// middleware auth
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT);
        const user_id = decodedToken.user_id;
        if (req.body.user_id && req.body.user_id !== user_id) {
            throw "Invalid user ID";
        }
        next();
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
