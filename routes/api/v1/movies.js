"use strict";

const express = require("express");
const router = express.Router();

const Movie = require("../../../models/Movie");

router.get("/", (req, res, next) => {
  res.send("Hello world");
});

module.exports = router;
