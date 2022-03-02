const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.ctrl");

// route for login and signup : user.
router.post("/like", likeCtrl.like);
router.delete("/:id", likeCtrl.unlike);

module.exports = router;
