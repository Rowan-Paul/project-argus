'use strict'

const User = require('./models/User')
const UserSession = require('./models/UserSession')
const Backdrop = require('./models/Backdrop')

const cron = require('node-cron')
const fetch = require('node-fetch')

// Delete sessions and accounts that are set for deleted
cron.schedule('0 0 * * fri', () => {
  UserSession.deleteMany({ isDeleted: true }, (err) => {
    if (err) {
      console.log(err)
    }
  })

  User.deleteMany({ isDeleted: true }, (err) => {
    if (err) {
      console.log(err)
    }
  })
})

// Fetch popular movies every day
cron.schedule('0 0 * * *', () => {
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
              }
            })
          })
        })
    })
})
