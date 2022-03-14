const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.ctrl");
const auth = require("../middleware/auth");

// route for login and signup : user.
router.post("/", auth, postCtrl.new);
router.get("/", postCtrl.getAll);
router.get("/:id", postCtrl.getOne);
router.delete("/:id", auth, postCtrl.delete);
router.put("/:id", auth, postCtrl.update);

module.exports = router;
