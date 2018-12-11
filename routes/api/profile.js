const express = require("express"),
  router = express.Router();

// GET: test
// Public
router.get("/test", (req, res) => res.json({ success: "Profile Works" }));

module.exports = router;
