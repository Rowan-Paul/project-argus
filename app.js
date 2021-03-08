'use-strict'

require('dotenv').config()
require('./scheduler')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')
const port = process.env.PORT || '3000'
const dbName = 'orion'

// IMPORT MODELS
require('./models/User')
require('./models/Movie')
require('./models/History')
require('./models/Backdrop')

// IMPORT ROUTES
const accountRouter = require('./routes/api/v1/account')
const movieRouter = require('./routes/api/v1/movies')

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cors())

// ROUTES MIDDLEWARE
app.use('/api/v1/account', accountRouter)
app.use('/api/v1/movies', movieRouter)

app.get('/', (req, res) => {
  res.redirect('https://projectarg.us/')
})

// CREATE SERVER
const server = app.listen(port, () => {
  mongoose.connect(
    `mongodb://localhost:27017/${dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log(`Orion server listening on port ${port}!`)
    }
  )
})
