const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  // Load Models
  Profile = require("../../models/Profile"),
  User = require("../../models/User");

// GET: test
//
// Public
router.get("/test", (req, res) => res.json({ success: "Profile Works" }));

// GET: Profile
//
//public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "This is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.sendStatus(404).json(err));
  }
);
module.exports = router;
