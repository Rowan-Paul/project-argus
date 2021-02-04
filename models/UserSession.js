const mongoose = require("mongoose");

const utils = require("../utils");

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  random: {
    type: String,
    default: utils.makeid(5),
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserSession", UserSessionSchema);
