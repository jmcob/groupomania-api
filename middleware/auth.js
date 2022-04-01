const jwt = require("jsonwebtoken");

// middleware auth
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT);
        const user_id = decodedToken.user_id;
        const admin = decodedToken.admin;
        // const exp = decodedToken.exp;
        // const dateExp = new Date(exp * 1000);
        // const dateNow = Date.now();
        // console.log(dateExp, dateNow);
        // if (dateExp < dateNow) {
        //     throw "Token expired";
        // }

        if (admin === true) {
            next();
        }
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
