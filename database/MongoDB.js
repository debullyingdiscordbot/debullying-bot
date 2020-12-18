const Discord = require('discord.js');
const User = require('./models/user');
const Request = require('./models/request');
const Guild = require('./models/guild');

// create or find user
module.exports.getUser = async (userID, message) => {
  try {
    let user = await User.findOne({ id: userID });
    if (user) {
      return user;
    } else {
      user = new User({
        id: userID,
        username: `${message.author.username}#${message.author.discriminator}`,
      });
      await user.save();
      return user;
    }
  } catch (err) {
    console.error(err);
  }
};
