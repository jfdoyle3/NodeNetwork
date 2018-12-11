// Initialise modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// colorize fonts
const colors = require("colors");
// green checkmark / red x-mark
const pass = "\u2713".green;
const fail = "\u2715".red;
const info = "[i]";
// Create app
const app = express();
// Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
// Database Key & Connections
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("[" + pass + "] MongoDB connected"))
  .catch(err => console.log(err));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`[` + pass + `] Server running on port ${port}`);
});
