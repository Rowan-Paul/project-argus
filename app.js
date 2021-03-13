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

// IMPORT ROUTES
const accountRouter = require('./routes/api/v1/account')
const movieRouter = require('./routes/api/v1/movies')
const messageRouter = require('./routes/api/v1/messages')

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('.'))
app.use(express.json())

// ROUTES MIDDLEWARE
app.use('/api/v1/account', accountRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/messages', messageRouter)

app.get('/', (req, res) => {
  res.redirect('https://projectarg.us/')
})

const stripe = require('stripe')(process.env.STRIPE_API_KEY)

app.post('/api/v1/checkout/card', async (req, res) => {
  const { amount } = req.body
  const { currency } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
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
