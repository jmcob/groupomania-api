const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.ctrl");
const auth = require("../middleware/auth");

// route for login and signup : user.
router.post("/", auth, commentCtrl.new);
router.get("/", commentCtrl.getAll);
router.get("/:id", commentCtrl.getOne);
router.delete("/:id", auth, commentCtrl.delete);
router.put("/:id", auth, commentCtrl.update);


module.exports = router;
