"use strict";

const User = require("./models/User");
const UserSession = require("./models/UserSession");

var cron = require("node-cron");

// Delete sessions and accounts that are set for deleted
cron.schedule("0 0 * * fri", () => {
  UserSession.deleteMany({ isDeleted: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });

  User.deleteMany({ isDeleted: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
