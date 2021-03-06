// Initialize modules
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path"),
  passport = require("passport"),
  // colorize fonts
  colors = require("colors"),
  // green check-mark / red x-mark / i info
  pass = "\u2713".green,
  fail = "\u2715".red,
  info = "[i]",
  // Create app
  app = express(),
  // Routes
  users = require("./routes/api/users"),
  node = require("./routes/api/node"),
  posts = require("./routes/api/posts"),
  // Database Key & Connections
  db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
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
app.use("/api/node", node);
app.use("/api/posts", posts);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use('/static', express.static(path.join(__dirname, 'client/build')));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`[` + pass + `] Server running on port ${port}`);
});
