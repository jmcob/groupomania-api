const jwt = require("jsonwebtoken");

// middleware auth
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT);

        const user_id = decodedToken.user_id;
        const exp = decodedToken.exp;
        const dateExp = new Date(exp * 1000);
        const dateNow = Date.now();
        console.log(dateExp, dateNow);
        if (dateExp < dateNow) {
            throw "Token expired";
        }
        if (
            (req.body.user_id && req.body.user_id === user_id) ||
            (req.body.user_id && req.body.admin === true)
        ) {
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
