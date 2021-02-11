"use strict";

const express = require("express");
const router = express.Router();
const encryptor = require("simple-encryptor")(
  process.env.KEY || "secretpasswordofmysupersecretkey"
);

const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

const utils = require("../../utils");

// Create an account
router.post("/signup", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.status(400).send("Error: Email cannot be blank.");
  }

  if (!password) {
    return res.status(400).send("Error: Password cannot be blank.");
  }

  email = email.toLowerCase();
  email = email.trim();

  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.sendStatus(500);
      } else if (previousUsers.length > 0) {
        return res.status(400).send("Error: Account already exist.");
      }

      // Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      newUser.save((err, user) => {
        if (err) {
          return res.sendStatus(500);
        }
        return res.status(201).send("Signed up");
      });
    }
  );
});

// Signin to account
router.post("/signin", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.status(400).send("Error: Email cannot be blank.");
  }

  if (!password) {
    return res.status(400).send("Error: Password cannot be blank.");
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        console.log("err 2:", err);
        return res.sendStatus(500);
      }

      if (users.length != 1) {
        return res.status(400).send("Error: Invalid username");
      }

      const user = users[0];

      if (!user.validPassword(password)) {
        return res.status(400).send("Error: Invalid password");
      }

      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;

      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        return res.status(201).send({
          message: "Signed in",
          token: encryptor.encrypt({
            random: doc.random,
            id: doc._id,
            timestamp: doc.timestamp,
          }),
        });
      });
    }
  );
});

// Sign out account
router.put("/signout", (req, res, next) => {
  // Get the token
  const { body } = req;
  const { token } = body;

  var tokenDec = encryptor.decrypt(token);
  if (
    tokenDec === null ||
    !("random" in tokenDec) ||
    !("id" in tokenDec) ||
    !("timestamp" in tokenDec)
  ) {
    return res.status(400).send("Incorrect token");
  }

  // Verify the token is one of a kind and it's not deleted.
  UserSession.findOneAndUpdate(
    {
      _id: tokenDec.id,
      random: tokenDec.random,
      timestamp: tokenDec.timestamp,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      return res.status(200).send("Logged out");
    }
  );
});

// Verify the token
router.put("/verify", (req, res, next) => {
  // Get the token
  const { body } = req;
  const { token } = body;

  var tokenDec = encryptor.decrypt(token);
  if (
    tokenDec === null ||
    !("random" in tokenDec) ||
    !("id" in tokenDec) ||
    !("timestamp" in tokenDec)
  ) {
    return res.status(400).send("Incorrect token");
  }

  // Verify the token is one of a kind and it's not deleted.
  UserSession.find(
    {
      _id: tokenDec.id,
      random: tokenDec.random,
      timestamp: tokenDec.timestamp,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (sessions.length != 1) {
        return res.sendStatus(400);
      } else {
        // DO ACTION
        return res.sendStatus(200);
      }
    }
  );
});

// Delete account
router.delete("/", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.status(400).send("Error: Email cannot be blank.");
  }

  if (!password) {
    return res.status(400).send("Error: Password cannot be blank.");
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        console.log("err 2:", err);
        return res.sendStatus(500);
      }

      if (users.length != 1) {
        return res.status(400).send("Error: Invalid username");
      }

      const user = users[0];

      if (!user.validPassword(password)) {
        return res.status(400).send("Error: Invalid password");
      }

      user.isDeleted = true;
      user.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        return res.status(200).send("Account deleted");
      });
    }
  );
});

module.exports = router;
