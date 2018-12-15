const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  // Model
  Post = require("../../models/Post"),
  Profile = require("../../models/Profile");
// Vslidation
validatePostInput = require("../../validation/post");
// GET: test
// Public
router.get("/test", (req, res) => res.json({ success: "Posts Works" }));
// GET api/post/
// get all
// public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ fail: "No posts exist" }));
});

// GET api/post/ id
//
// public
router.get("/", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ fail: "Post Id does not exist" }));
});

// Post api/post
// create
// private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { text, name, avatar } = req.body,
      { errors, isValid } = validatePostInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text,
      name,
      avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// DELETE Post /api/post
//
//private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ fail: "Unauthorized user" });
          }
          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ fail: "No Post found" }));
    });
  }
);
module.exports = router;
