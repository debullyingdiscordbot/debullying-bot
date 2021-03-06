const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    game: String,
    timeframe: Number,
    fulfilled: {
      type: Boolean,
      default: false,
    },
    guildId: String,
    guildName: String,
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
