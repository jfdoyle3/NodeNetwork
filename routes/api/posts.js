const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  // Model
  Post = require("../../models/Post"),
  Profile = require("../../models/Profile");
// Validation
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

// DELETE Post /api/post/id
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

// POST Post /api/post/like/id
// like post
//private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ fail: "User already likes this post" });
          }
          //add user id to likes
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ fail: "No Post found" }));
    });
  }
);
// POST Post /api/post/unlike/id
// unlike post
//private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ fail: "You have not liked this post yet" });
          }
          //get removed index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of Array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ fail: "No Post found" }));
    });
  }
);

// POST api/posts/comment/:d
// add comment to post
// private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { text, name, avatar } = req.body,
      { errors, isValid } = validatePostInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text,
          name,
          avatar,
          user: req.user.id
        };
        // Add comments to the Array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status.json({ fail: "no posts found" }));
  }
);

// DELETE api/posts/comment/:id/:comment_id
// delete comment from post
// private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { text, name, avatar } = req.body;

    Post.findById(req.params.id)
      .then(post => {
        // check for comment
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ fail: "Comment does not exist" });
        }
        // get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        // Splice comment out
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status.json({ fail: "no posts found" }));
  }
);
module.exports = router;
