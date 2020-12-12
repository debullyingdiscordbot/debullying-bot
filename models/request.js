const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  user: String,
  game: String,
  timeframe: Number,
});

module.exports = mongoose.model('Request', RequestSchema);
