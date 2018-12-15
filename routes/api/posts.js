const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport");
Post = require("../../models/Post");

// GET: test
// Public
router.get("/test", (req, res) => res.json({ success: "Posts Works" }));

// Post api/post
// create
// private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { text, name, avatar } = req.body,
      newPost = new Post({
        text,
        name,
        avatar,
        user: req.user.id
      });

    newPost.save().then(post => res.json(post));
  }
);
module.exports = router;
