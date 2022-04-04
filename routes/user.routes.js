const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.ctrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const passwordCheck = require("../middleware/password");

// route for login and signup : user.
router.post("/signup", passwordCheck, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", userCtrl.getOne);
router.put("/:id", auth, multer, userCtrl.updateOne);
router.delete("/:id", auth, userCtrl.deleteOne);

module.exports = router;
