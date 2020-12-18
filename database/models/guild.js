const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
});

module.exports = mongoose.model('Guild', GuildSchema, 'guilds');
