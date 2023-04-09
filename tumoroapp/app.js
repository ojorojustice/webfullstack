
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const session = require("express-session");


const app = express();
const port = 3000;
const users = require("./server/routes/users");
const places = require("./server/routes/places");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(
  session({
    secret: "oneWithGod@#$tumoroApp",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users", users);
app.use("/places", places);

app.get("/", (req, res) => {
  res.send(" Invalid port");
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});

mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed: " + err);
  });

// mongoose.connect("mongodb://localhost:27017/tumoroapp", {
//   useNewUrlParser: true,
// });

// mongoose.connection.on("connected", () => {
//   console.log("database connected to " + config.database);
// });

// mongoose.connection.on("error", (err) => {
//   console.log("database error: " + err);
// });
