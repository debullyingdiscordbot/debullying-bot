const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String },
  registeredAt: { type: Number },
  isTroubleMaker: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
