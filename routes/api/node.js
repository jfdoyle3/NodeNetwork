const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  // Validation
  validateNodeInput = require("../../validation/node"),
  validateExperienceInput = require("../../validation/experience"),
  validateEducationInput = require("../../validation/education"),
  // Load Models
  Node = require("../../models/Node"),
  User = require("../../models/User");

// GET: test
//
// Public
router.get("/test", (req, res) => res.json({ success: "Node Works" }));

// GET: Node
//
//private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Node.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(node => {
        if (!node) {
          errors.nonode = "This is no node for this user";
          return res.status(404).json(errors);
        }
        res.json(node);
      })
      .catch(err => res.sendStatus(404).json(err));
  }
);

// get node by handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Node.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(node => {
      if (!node) {
        errors.nonode = "There is no node for this user";
        res.status(404).json(errors);
      }
      res.json(node);
    })
    .catch(err => res.status(404).json(err));
});
// get node by user id
// public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Node.findOne({ handle: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(node => {
      if (!node) {
        errors.nonode = "There is no node for this user";
        res.status(404).json(errors);
      }
      res.json(node);
    })
    .catch(err => res.status(404).json(err));
});

// all nodes
// publix
router.get("/all", (req, res) => {
  const errors = {};
  Node.find()
    .populate("user", ["name", "avatar"])
    .then(nodes => {
      errors.nonode = "There is no nodes";
      if (!nodes) {
        return res.status(404).json(errors);
      }
      res.json(nodes);
    })
    .catch(err => res.status(404).json(err));
});

// create node
//private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNodeInput(req.body);
    // check validation
    if (!isValid) {
      //return status 400 on errors
      return res.status(400).json(errors);
    }

    // get fields
    const nodeFields = {};
    nodeFields.user = req.user.id;
    if (req.body.handle) nodeFields.handle = req.body.handle;
    if (req.body.company) nodeFields.company = req.body.company;
    if (req.body.website) nodeFields.website = req.body.website;
    if (req.body.location) nodeFields.location = req.body.location;
    if (req.body.bio) nodeFields.bio = req.body.bio;
    if (req.body.status) nodeFields.status = req.body.status;
    if (req.body.githubusername)
      nodeFields.githubusername = req.body.githubusername;
    //Skills split in an array
    if (typeof req.body.skills !== "undefined") {
      nodeFields.skills = req.body.skills.split(",");
    }
    // social
    nodeFields.social = {};
    if (req.body.youtube) nodeFields.social.youtube = req.body.youtube;
    if (req.body.twitter) nodeFields.social.twitter = req.body.twitter;
    if (req.body.facebook) nodeFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) nodeFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) nodeFields.social.instagram = req.body.instagram;

    Node.findOne({ user: req.user.id }).then(node => {
      if (node) {
        // update
        Node.findOneAndUpdate(
          { user: req.user.id },
          { $set: nodeFields },
          { new: true }
        ).then(node => res.json(node));
      } else {
        // Create

        // check
        Node.findOne({ handle: nodeFields.handle }).then(node => {
          if (node) {
            errors.handle = "That handle already exist";
            res.json(404).json(errors);
          }
          // save node
          new Node(nodeFields).save().then(node => res.json(node));
        });
      }
    });
  }
);

// POST experience
//
// Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    // check validation
    if (!isValid) {
      //return status 400 on errors
      return res.status(400).json(errors);
    }
    Node.findOne({ user: req.user.id }).then(node => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add
      node.experience.unshift(newExp);
      node.save().then(node => res.json(node));
    });
  }
);

// POST education
//
// Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    // check validation
    if (!isValid) {
      //return status 400 on errors
      return res.status(400).json(errors);
    }
    Node.findOne({ user: req.user.id }).then(node => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add
      node.education.unshift(newEdu);
      node.save().then(node => res.json(node));
    });
  }
);
// DELETE experience/:exp_id
//
// Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Node.findOne({ user: req.user.id })
      .then(node => {
        // get remove index
        const removeIndex = node.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        node.experience.splice(removeIndex, 1);

        //save
        node.save().then(node => res.json(node));
      })
      .catch(err => res.status(404).json(err));
  }
);

// DELETE education/:exp_id
//
// Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Node.findOne({ user: req.user.id })
      .then(node => {
        // get remove index
        const removeIndex = node.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice out of array
        node.education.splice(removeIndex, 1);

        //save
        node.save().then(node => res.json(node));
      })
      .catch(err => res.status(404).json(err));
  }
);

//  delete user and node
//
//
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Node.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);
module.exports = router;
