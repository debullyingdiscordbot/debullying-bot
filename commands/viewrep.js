const { MessageEmbed } = require('discord.js');
const User = require('../database/models/user');
const Request = require('../database/models/request');

const viewUserMsg = (user) => {
  return new MessageEmbed()
    .setTitle(`${user.username} (LVL ${user.goodPersonRank})`)
    .setDescription(
      `Mute Count: ${user.muteCount} 
      Warning Count: ${user.warnCount}
      Kick Count: ${user.kickCount}
      Ban Count: ${user.banCount}
      Total Time Played: ${user.totalTimePlayed}
      `
    )
    .setColor(process.env.EMBED_COLOR);
};
module.exports = {
  name: 'viewrep',
  description: "views the user's rep",
  async execute(message, args, client) {
    try {
      //   const req = await Request.find({
      //     game: args.join(' ').toLowerCase(),
      //   });

      // console.log(args);
      const user = await User.findOne({ id: args[0] });

      if (args.length === 0) return message.author.send('Please provide ID');

      console.log(user);
      message.author.send(viewUserMsg(user));

      // const newMsg = await message.author
      //   .send(foundGameMsg(req.length))
      //   .then((embedMsg) => {
      //     embedMsg.react('👍');
      //     embedMsg.react('👎');

      //     embedMsg
      //       .awaitReactions(
      //         (reaction, user) =>
      //           user.id == message.author.id &&
      //           (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
      //         { max: 1, time: 60000 }
      //       )
      //       .then((reaction) => {
      //         if (reaction.first().emoji.name == '👍') {
      //           const randomMatch = req[Math.floor(Math.random() * req.length)].username;

      //           message.author.send(foundMatchMsg(randomMatch));
      //         } else {
      //           message.author.send('aslkdjflasdfl');
      //         }
      //       })
      //       .catch((err) => {
      //         console.error(err);
      //         message.author.send('No reaction after 60 seconds, operation canceled');
      //       });
      //   });
    } catch (error) {
      console.error(error);
    }
  },
};
