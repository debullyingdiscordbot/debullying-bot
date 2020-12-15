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
  goodPersonRank: {
    type: Number,
    default: 0,
  },

  // todo: add some kinda level to gamify
});

module.exports = mongoose.model('User', UserSchema);
