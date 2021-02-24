const mongoose = require('mongoose')

const PopularMovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  backdropPath: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
})

module.exports = mongoose.model('PopularMovie', PopularMovieSchema)
