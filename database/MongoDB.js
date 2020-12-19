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

// create match make request
module.exports.createRequest = async (message, game, time) => {
  try {
    let user = await User.findOne({ id: message.author.id });

    let req = new Request({
      // todo: change id to something like userid in request model
      userId: message.author.id,
      username: `${message.author.username}#${message.author.discriminator}`,
      game,
      timeframe: time,
      guildId: message.guild.id,
      guildName: message.guild.name,
      user: message.author._id,
    });

    await req.save();
    user.requests.push(req);
    await user.save();

    console.log('added match request to db');
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUserMatchFeedback = async (reaction, userId) => {
  let update;
  if (reaction == '👍') {
    update = { $inc: { positiveGames: 1 } };
  } else {
    update = { $inc: { negativeGames: 1 } };
  }

  try {
    const filter = { id: userId };

    let user = await User.findOneAndUpdate(filter, update, { new: true });

    console.log(user);
  } catch (err) {
    console.error(err);
  }
};
