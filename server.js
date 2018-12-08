// Initialise modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
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
  .then(() => console.log("MongoDB connected"))
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
app.listen(port, () => console.log(`Server running on port ${port}`));
