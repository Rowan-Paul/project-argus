'use-strict'

const express = require('express')

const encryptor = require('simple-encryptor')(
  process.env.KEY || 'secretpasswordofmysupersecretkey'
)

const User = require('./models/User')
const UserSession = require('./models/UserSession')

function verifyAuthHeader(authHeader) {
  if (authHeader === undefined) {
    return { authenticated: false }
  } else {
    var tokenDec = encryptor.decrypt(authHeader.split(' ')[1])

    if (
      tokenDec === null ||
      !('random' in tokenDec) ||
      !('id' in tokenDec) ||
      !('timestamp' in tokenDec)
    ) {
      return { authenticated: false }
    }

    // Verify the token is one of a kind and it's not deleted.
    const result = UserSession.find(
      {
        _id: tokenDec.id,
        random: tokenDec.random,
        timestamp: tokenDec.timestamp,
        isDeleted: false,
      },
      (err, sessions) => {
        if (err || sessions.length < 1) {
          return { authenticated: false }
        }

        return { authenticated: true, userId: sessions[0].userId }
      }
    )

    return result
  }
}

function checkAdmin(userId) {
  if (userId === undefined) {
    return { isAdmin: false }
  }

  const result = User.findOneAndUpdate(
    {
      _id: userId,
      isDeleted: false,
      isAdmin: true,
    },
    (err, response) => {
      if (err) {
        return { isAdmin: false }
      }

      return { isAdmin: true }
    }
  )

  return result
}

module.exports = {
  verifyAuthHeader,
  checkAdmin,
}
