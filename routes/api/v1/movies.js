'use strict'

const express = require('express')
const router = express.Router()

const Movie = require('../../../models/Movie')
const History = require('../../../models/History')
const PopularMovie = require('../../../models/PopularMovie')

// Get information for a movie
router.get('/popular', (req, res) => {
  PopularMovie.find({}, (err, movies) => {
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

  Movie.find(
    // movie can be both the title or _id of the movie
    { $or: [{ _id: movie }, { title: movie }] },
    { _id: 0, __v: 0 },
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
    return res.status(400).status('Movie is required')
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

module.exports = router
