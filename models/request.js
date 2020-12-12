const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
  {
    user: String,
    game: String,
    timeframe: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', RequestSchema);
