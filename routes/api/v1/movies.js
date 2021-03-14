'use strict'

const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const Movie = require('../../../models/Movie')
const History = require('../../../models/History')
const Backdrop = require('../../../models/Backdrop')

const authHeaderHandler = require('../../../authHeaderHandler')

// Get a list of popular movies cached from tmdb
router.get('/popular', (req, res) => {
  Backdrop.find({}, (err, movies) => {
    if (err || movies.length < 1) {
      return res.status(404).send('Failed to find movie')
    }

    return res.status(200).send(movies)
  })
})

// Create a movie
router.post('/', async (req, res) => {
  const { body } = req
  const { title } = body
  const { year } = body
  const { overview } = body
  const { poster } = body

  const authHeader = await authHeaderHandler.verifyAuthHeader(
    req.headers.authorization
  )

  const checkAdmin = await authHeaderHandler.checkAdmin(authHeader.userId)

  if (!authHeader.authenticated) {
    return res.sendStatus(401)
  }

  if (!checkAdmin.isAdmin) {
    return res.sendStatus(401)
  }

  if (!title || !year) {
    return res.status(400).send('Title and year are required')
  }

  const newMovie = new Movie()
  newMovie.title = title
  newMovie.year = year
  if (overview) {
    newMovie.overview = overview
  }
  if (poster) {
    newMovie.poster = poster
  }

  newMovie.save((err) => {
    if (err) {
      return res.status(500).send('Failed to create movie')
    }
    return res.status(201).send('Movie created')
  })
})

// Edit a movie
router.put('/:movie', async (req, res) => {
  const { body } = req
  const { title } = body
  const { year } = body
  let { overview } = body
  let { poster } = body

  const { params } = req
  const { movie } = params

  const authHeader = await authHeaderHandler.verifyAuthHeader(
    req.headers.authorization
  )

  const checkAdmin = await authHeaderHandler.checkAdmin(authHeader.userId)

  if (!authHeader.authenticated) {
    return res.sendStatus(401)
  }

  if (!checkAdmin.isAdmin) {
    return res.sendStatus(401)
  }

  if (!title || !year) {
    return res.status(400).send('Title and year are required')
  }

  if (!overview) {
    overview = null
  }
  if (!poster) {
    poster = null
  }

  Movie.findOneAndUpdate(
    {
      _id: movie,
    },
    { $set: { title: title, year: year, overview: overview, poster: poster } },
    (err) => {
      if (err) {
        return res.sendStatus(500)
      }

      return res.status(201).send('Updated movie')
    }
  )
})

// Remove a movie
router.delete('/:movie', async (req, res) => {
  const { params } = req
  const { movie } = params

  const authHeader = await authHeaderHandler.verifyAuthHeader(
    req.headers.authorization
  )

  const checkAdmin = await authHeaderHandler.checkAdmin(authHeader.userId)

  if (!authHeader.authenticated) {
    return res.sendStatus(401)
  }

  if (!checkAdmin.isAdmin) {
    return res.sendStatus(401)
  }

  Movie.findOneAndDelete(
    {
      _id: movie,
    },
    (err) => {
      if (err) {
        return res.sendStatus(500)
      }

      return res.status(200).send('Removed movie')
    }
  )
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

      return res.status(200).send(movies)
    }
  )
})

// Mark a movie as watched
router.post('/:movie/watched', async (req, res) => {
  const { params } = req
  const { movie } = params

  const { body } = req
  const { date } = body

  const authHeader = await authHeaderHandler.verifyAuthHeader(
    req.headers.authorization
  )

  if (!authHeader.authenticated) {
    return res.sendStatus(401)
  }

  if (!movie) {
    return res.status(400).send('Movie is required')
  }

  const newHistory = new History()
  newHistory.itemId = movie
  newHistory.userId = authHeader.userId
  if (date) {
    newHistory.date = date
  }

  newHistory.save((err) => {
    if (err) {
      return res.status(500).send('Failed to mark as watched')
    }
    return res.status(201).send('Marked as watched')
  })
})

// Check if a movie is watched
router.get('/:movie/watched', async (req, res) => {
  const { params } = req
  const { movie } = params

  const authHeader = await authHeaderHandler.verifyAuthHeader(
    req.headers.authorization
  )

  if (!authHeader.authenticated) {
    return res.sendStatus(401)
  }

  History.find({ itemId: movie, userId: authHeader.userId }, (err, results) => {
    if (err) {
      return res.status(500).send('Something went wrong')
    }

    return res.status(200).send({ _id: movie, timesWatched: results.length })
  })
})

router.put('/popular', (req, res) => {
  Backdrop.deleteMany({}, (err) => {
    if (err) {
      console.log(err)
    }
  })
    .then(() => {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      )
        .then((response) => response.json())
        .then((movies) => {
          movies.results.forEach((result) => {
            const backdrop = new Backdrop()

            backdrop.title = result.title
            backdrop.backdropPath = result.backdrop_path
            backdrop.type = 'movie'

            backdrop.save((err, doc) => {
              if (err) {
                res.status(500).send('Failed to update movies')
                console.log(err)
              }
            })
          })
        })
    })
    .then(() => {
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      )
        .then((response) => response.json())
        .then((movies) => {
          movies.results.forEach((result) => {
            const backdrop = new Backdrop()

            backdrop.title = result.name
            backdrop.backdropPath = result.backdrop_path
            backdrop.type = 'tv'

            backdrop.save((err, doc) => {
              if (err) {
                console.log(err)
                res.status(500).send('Failed to update tv shows')
              }
            })
          })
        })
        .then(() => {
          return res.status(201).send('Updated popular movies and tv shows')
        })
    })
})

module.exports = router
