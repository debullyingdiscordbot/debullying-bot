const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
  {
    id: String,
    username: String,
    game: String,
    timeframe: Number,
    fulfilled: {
      type: Boolean,
      default: false,
    },
    date: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  }
  // { timestamps: true }
);

module.exports = mongoose.model('Request', RequestSchema);
