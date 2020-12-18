const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  username: String,
  muteCount: {
    type: Number,
    default: 0,
  },
  warnCount: {
    type: Number,
    default: 0,
  },
  kickCount: {
    type: Number,
    default: 0,
  },
  banCount: {
    type: Number,
    default: 0,
  },
  // todo: add some kinda level to gamify
  goodPersonRank: {
    type: Number,
    default: 0,
  },
  botCalledAmount: {
    type: Number,
    default: 0,
  },
  totalTimePlayed: {
    type: Number,
    default: 0,
  },
  successfulMatches: {
    type: Number,
    default: 0,
  },
  unsuccessfulMatches: {
    type: Number,
    default: 0,
  },
  positiveGames: {
    type: Number,
    default: 0,
  },
  negativeGames: {
    type: Number,
    default: 0,
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
