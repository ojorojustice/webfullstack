const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config/database");
const User = require("../models/users");
const sequenceGenerator = require("./sequenceGenerator");

router.post("/register", (req, res, next) => {
  const maxUsersId = sequenceGenerator.nextId("users");
  // res.send("Register users here");
  let newUser = new User({
    id: maxUsersId,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "failed to register user" });
    }
    if (user) {
      res.json({ success: true, msg: "User registered" });
    }
  });
});

router.post("/update", (req, res, next) => {
  res.send("update users here");
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }, (err, d, a) => {
    console.log(err, d, a);
  }),
  (req, res, next) => {
    console.log(req.user);
    res.send({ user: req.user });
  }
);

router.put("/delete", (req, res, next) => {
  res.send("delete specific users here");
});

router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res.json({ success: false, msg: "User not found" });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) {
          res.send(err);
        }
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), "oneWithGodtumoroApp", {
            expiresIn: 604800,
          });
          res.json({
            success: true,
            token: "JWT " + token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
            },
          });
        } else {
          return res.json({ success: false, msg: "Wrong password" });
        }
      });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
