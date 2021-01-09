const { MessageEmbed } = require('discord.js');
const User = require('../database/models/user');

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
      // console.log(message.guild.members.cache);

      if (member) {
        member.ban().catch((err) => console.error(err));
        // .then((member) => message.channel.send(`Bye ${member}.`))
        // .catch((err) => {
        //   console.error(err);
        //   message.channel.send('This member is an admin. No can do.');
        // });
      } else {
        message.reply('That member was not found.');
      }

      // } else if (command === 'ban') {
      //   if (!msg.member.hasPermission('BAN_MEMBERS'))
      //     return msg.reply('You do not have permissions to use that command.');
      //   if (args.length === 0) return msg.reply('Please provide ID');

      //   msg.guild.members.ban(args[0]).catch((err) => console.log(err));
      // }

      // console.log(`[${msg.author.tag}]: ${msg.content}`);

      // let embed = new MessageEmbed()
      //   .setTitle('kick')
      //   .setDescription('bye')
      //   .setColor('blue')
      //   .setFooter('yes');
      // return message.channel.send(embed);
    } catch (error) {
      console.error(error);
    }
  },
};
