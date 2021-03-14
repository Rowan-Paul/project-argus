const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Movie', MovieSchema)
