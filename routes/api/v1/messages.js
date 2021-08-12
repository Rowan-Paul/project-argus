'use strict'

const express = require('express')
const router = express.Router()

const Message = require('../../../models/Message')

const authHeaderHandler = require('../../../authHeaderHandler')

// Create a message
router.post('/', (req, res) => {
  const { body } = req
  const { name } = body
  const { email } = body
  const { message } = body

  if (!name || !email || !message) {
    return res.status(400).send('Name, email and message are required')
  }

  const newMessage = new Message()
  newMessage.name = name
  newMessage.email = email
  newMessage.message = message

  newMessage.save((err) => {
    if (err) {
      return res.status(500).send('Failed to create message')
    }
    return res.status(201).send('Message created')
  })
})

// Get messages, sorted by newest
router.get('/', async (req, res) => {
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

  Message.find({}, '-__v', (err, messages) => {
    if (err || messages.length < 1) {
      return res.status(404).send('Failed to find messages')
    }

    const response = messages.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date)
    })

    return res.status(200).send(response)
  })
})

// Remove a message
router.delete('/:message', async (req, res) => {
  const { params } = req
  const { message } = params

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

  Message.findOneAndDelete(
    {
      _id: message,
    },
    (err) => {
      if (err) {
        return res.sendStatus(500)
      }

      return res.status(200).send('Removed message')
    }
  )
})

module.exports = router
