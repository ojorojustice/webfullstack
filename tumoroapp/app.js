const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const users = require("./server/routes/users");

app.use(cors());
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

app.use("/users", users);

app.get("/", (req, res) => {
  res.send(" Invalid port");
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
