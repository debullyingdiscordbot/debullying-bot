const { MessageEmbed } = require('discord.js');
const { increaseBanCount } = require('../database/MongoDB');

module.exports = {
  name: 'ban',
  description: 'Ban the member.',

  async execute(message, args, client) {
    try {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message
          .reply('You do not have permissions to use that command.')
          .then((m) => m.delete({ timeout: 5000 }));
      if (args.length === 0)
        return message
          .reply('Please provide ID')
          .then((m) => m.delete({ timeout: 5000 }));

      const member = message.guild.members.cache.get(args[0]);

      if (member) {
        await increaseBanCount(message.author.id);
        member.ban().catch((err) => console.error(err));
        // message?
        client.logger.log(`${message.author.id} has been banned.`);
      } else {
        message.reply('That member was not found.');
      }
    } catch (error) {
      console.error(error);
    }
  },
};
