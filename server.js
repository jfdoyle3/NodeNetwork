const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  // Routes
  users = require("./routes/api/users"),
  profile = require("./routes/api/profile"),
  posts = require("./routes/api/posts"),
  // Database Key
  db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Resist is Futile"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
