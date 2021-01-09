const { MessageEmbed } = require('discord.js');
const User = require('../database/models/user');

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
const noUserMsg = () => {
  return new MessageEmbed()
    .setTitle(`No user found with that ID. Try again.`)
    .setDescription('example: !viewrep 000000000000000000')
    .setColor(process.env.EMBED_COLOR);
};
module.exports = {
  name: 'viewrep',
  description: "views the user's rep",
  async execute(message, args, client) {
    try {
      const user = await User.findOne({ id: args[0] });

      if (args.length === 0) return message.author.send('Please provide ID');

      if (user) {
        // console.log(user);
        message.author.send(viewUserMsg(user));
      } else {
        message.author.send(noUserMsg());
      }
    } catch (error) {
      // console.error(error);
      client.logger.error(error);
    }
  },
};
