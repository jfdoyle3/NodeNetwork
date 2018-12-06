const express = require("express"),
  router = express.Router(),
  User = require("../../models/User"),
  gravatar = require("gravatar"),
  bcrypt = require("bcryptjs");

// GET: Test
// Public
router.get("/test", (req, res) => res.json({ success: "Users Works" }));

// GET: Register
// Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ fail: "Email already exists" });
    } else {
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
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

module.exports = router;
