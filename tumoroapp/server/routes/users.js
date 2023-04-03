const express = require("express");
const router = express.Router();

router.get("/register", (req, res, next) => {
  res.send("Register users here");
});

router.get("/update", (req, res, next) => {
  res.send("update users here");
});

router.get("/search", (req, res, next) => {
  res.send("Search for users here ");
});

router.get("/delete", (req, res, next) => {
  res.send("delete specific users here");
});

module.exports = router;
