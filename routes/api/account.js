"use strict";

const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

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
        return res
          .status(201)
          .send({ message: "Valid sign in", token: doc._id });
      });
    }
  );
});

// Logout of account
router.get("/logout", (req, res, next) => {
  // Get the token
  const { query } = req;
  const { token } = query;

  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.findOneAndUpdate(
    {
      _id: token,
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
      return res.sendStatus(200);
    }
  );
});

// Verify the token
router.get("/verify", (req, res, next) => {
  // Get the token
  const { query } = req;
  const { token } = query;

  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.find(
    {
      _id: token,
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

module.exports = router;
