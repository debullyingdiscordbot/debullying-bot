const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String },
  registeredAt: { type: Number },
});

module.exports = mongoose.model('User', UserSchema);
