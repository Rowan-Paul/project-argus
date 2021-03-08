'use strict'

const express = require('express')
const router = express.Router()

const Movie = require('../../../models/Movie')
const History = require('../../../models/History')
const Backdrop = require('../../../models/Backdrop')

// Get a list of popular movies cached from tmdb
router.get('/popular', (req, res) => {
  Backdrop.find({}, (err, movies) => {
    if (err || movies.length < 1) {
      return res.status(404).send('Failed to find movie')
    }

    return res.send(movies)
  })
})

// Create a movie
router.post('/', (req, res) => {
  const { body } = req
  const { title } = body
  const { year } = body
  const { overview } = body

  if (!title || !year) {
    return res.status(400).send('Title and year are required')
  }

  const newMovie = new Movie()
  newMovie.title = title
  newMovie.year = year
  if (overview) {
    newMovie.overview = overview
  }

  newMovie.save((err) => {
    if (err) {
      return res.status(500).send('Failed to create movie')
    }
    return res.sendStatus(201)
  })
})

// Get information for a movie
router.get('/:movie', (req, res) => {
  const { params } = req
  const { movie } = params

  if (!movie) {
    return res.sendStatus(400)
  }

  // check if movie is object id, if not replace it by a
  // 'fake' objectid so it doesn't error mongo
  var ObjectId = require('mongoose').Types.ObjectId
  var objId = new ObjectId(movie.length < 12 ? '123456789012' : movie)

  Movie.find(
    // movie can be both the title or _id of the movie
    {
      $or: [{ _id: objId }, { title: { $regex: movie, $options: 'i' } }],
    },
    { __v: 0 },
    (err, movies) => {
      if (err || movies.length < 1) {
        return res.status(404).send('Failed to find movie')
      }

      return res.send(movies)
    }
  )
})

// Mark a movie as watched
router.post('/:movie/watched', (req, res) => {
  const { params } = req
  const { movie } = params

  const { body } = req
  const { date } = body

  if (!movie) {
    return res.status(400).send('Movie is required')
  }

  const newHistory = new History()
  newHistory.itemId = movie
  newHistory.userId = '602bc6ff7e6d101458d1eb4d' //TODO: get user id from auth bearer or something
  if (date) {
    newHistory.date = date
  }

  newHistory.save((err) => {
    if (err) {
      return res.status(500).send('Failed to mark as watched')
    }
    return res.sendStatus(201)
  })
})

// Check if a movie is watched
router.get('/:movie/watched', (req, res) => {
  const { params } = req
  const { movie } = params

  // in the future, this should be gotten from auth token or something
  const user = '602bc6ff7e6d101458d1eb4d'

  History.find({ itemId: movie, userId: user }, (err, results) => {
    if (err) {
      return res.status(500).send('Something went wrong')
    }

    return res.send({ _id: movie, timesWatched: results.length })
  })
})

module.exports = router
