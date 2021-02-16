const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("History", HistorySchema);
