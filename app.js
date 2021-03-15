'use-strict'

require('dotenv').config()
require('./scheduler')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const cors = require('cors')
const port = process.env.PORT || '3000'
const dbName = 'orion'

const authHeaderHandler = require('./authHeaderHandler')

// IMPORT ROUTES
const accountRouter = require('./routes/api/v1/account')
const movieRouter = require('./routes/api/v1/movies')
const messageRouter = require('./routes/api/v1/messages')

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('.'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../andromeda/build')))

// ROUTES MIDDLEWARE
app.use('/api/v1/account', accountRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/messages', messageRouter)

const stripe = require('stripe')(process.env.STRIPE_API_KEY)

app.post('/api/v1/checkout/:method', async (req, res) => {
  const { amount } = req.body
  const { currency } = req.body
  const { method } = req.params

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    payment_method_types: [method],
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

app.get('/api/v1/donations', async (req, res) => {
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

  const charges = await stripe.charges.list({
    limit: 10,
  })

  let response = []
  charges.data.forEach((data) => {
    response.push({
      amount: data.amount,
      name: data.billing_details.name,
      date: data.created,
      id: data.id,
      currency: data.currency,
    })
  })

  res.status(200).send(response)
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../andromeda/build', 'index.html'))
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
