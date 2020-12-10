const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
  guild = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildID: guild.id,
    guildName: guild.name,
  });

  guild
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  console.log('Bot joined a new server!');
};
