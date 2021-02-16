"use strict";

const express = require("express");
const router = express.Router();

const Movie = require("../../../models/Movie");

// Create a movie
router.post("/", (req, res) => {
  const { body } = req;
  const { title } = body;
  const { year } = body;
  const { overview } = body;

  if (!title || !year) {
    return res.status(400).send("Title and year are required");
  }

  const newMovie = new Movie();
  newMovie.title = title;
  newMovie.year = year;
  if (overview) {
    newMovie.overview = overview;
  }

  newMovie.save((err) => {
    if (err) {
      return res.status(500).send("Failed to create movie");
    }
    return res.sendStatus(201);
  });
});

module.exports = router;
