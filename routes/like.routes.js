const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.ctrl");
const auth = require("../middleware/auth");

// route for login and signup : user.
router.post("/", auth, likeCtrl.like);
router.delete("/", auth, likeCtrl.unlike);
router.get("/:id", likeCtrl.counter);

module.exports = router;
