"use strict";

const express = require("express");
const router = express.Router();
const User = require("../../models/User");

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
        return res.status(400).send("Error: Server error");
      } else if (previousUsers.length > 0) {
        return res.status(400).send("Error: Account already exist.");
      }

      // Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      newUser.save((err, user) => {
        if (err) {
          return res.status(400).send("Error: Server error");
        }
        return res.status(201).send("Signed up");
      });
    }
  );
}); // end of sign up endpoint

module.exports = router;
