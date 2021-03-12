'use strict'

const express = require('express')
const router = express.Router()

const Message = require('../../../models/Message')

const authHeaderHandler = require('../../../authHeaderHandler')

// Create a message
router.post('/', (req, res) => {
  console.log('hello')
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

module.exports = router
