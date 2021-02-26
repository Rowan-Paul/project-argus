const mongoose = require('mongoose')

const BackdropSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Backdrop', BackdropSchema)
