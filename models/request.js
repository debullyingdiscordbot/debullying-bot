const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
  {
    id: String,
    username: String,
    game: String,
    timeframe: Number,
    date: { type: Date, default: Date.now },
  }
  // { timestamps: true }
);

module.exports = mongoose.model('Request', RequestSchema);
