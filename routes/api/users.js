const express = require("express"),
  router = express.Router(),
  User = require("../../models/User"),
  gravatar = require("gravatar"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  keys = require("../../config/keys"),
  // Validation
  validateRegisterInput = require("../../validation/register"),
  validateLoginInput = require("../../validation/login");

// Route: GET Login
// Desc:  Login User / Return JWT Token
// Access: Public
router.get("/test", (req, res) => res.json({ success: "Users Works" }));

// Route: GET Login
// Desc:  Login User / Return JWT Token
// Access: Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      error.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(email, {
          s: "200", //size
          r: "pg", // rating
          d: "mm" // default
        }),
        newUser = new User({
          name,
          email,
          avatar,
          password
        });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Route: GET Login
// Desc:  Login User / Return JWT Token
// Access: Public

router.post("/login", (req, res) => {
  const { email, password } = req.body,
    { errors, isValid } = validateLoginInput(req.body);

  // Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not Found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// GET Current User
//
// private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
