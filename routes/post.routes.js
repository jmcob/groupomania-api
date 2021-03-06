const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.ctrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// route for login and signup : user.
router.post("/", auth, multer, postCtrl.new);
router.get("/", postCtrl.getAll);
router.get("/:id", postCtrl.getOne);
router.delete("/:id", auth, postCtrl.delete);
router.put("/:id", auth, multer, postCtrl.update);

module.exports = router;
