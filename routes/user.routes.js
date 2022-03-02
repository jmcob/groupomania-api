const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.ctrl");

// route for login and signup : user.
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", userCtrl.getOne);

module.exports = router;
