const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userid: String,
  username: String,

  // todo: add some kinda level to gamify
  // todo: add banned kick mute etc warning count stuff
  // registeredAt: { type: Number },
  // isTroubleMaker: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
