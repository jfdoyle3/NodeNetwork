const express = require("express"),
  router = express.Router();

// GET: test
// Public
router.get("/test", (req, res) => res.json({ success: "Posts Works" }));

module.exports = router;
