const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  name: 'kick',
  description: 'Kick the member.',

  async execute(message, args) {
    try {
      // console.log(message.);
      console.log(args);
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command.');
      if (args.length === 0) return message.reply('Please provide ID');

      const member = message.guild.members.cache.get(args[0]);
      console.log(message.guild.members.cache);

      if (member) {
        member
          .kick('misbehaving')
          .then((member) => message.channel.send(`Bye ${member}.`))
          .catch((err) => {
            console.error(err);
            message.channel.send('This member is an admin. No can do.');
          });
      } else {
        message.channel.send('That member was not found.');
      }

      // TODOS: Move the big ole chunk of text into their own commands under ./commands/
      // if (command === 'kick') {
      //   if (!msg.member.hasPermission('KICK_MEMBERS'))
      //     return msg.reply('You do not have permissions to use that command.');
      //   if (args.length === 0) return msg.reply('Please provide ID');

      //   const member = msg.guild.members.cache.get(args[0]);

      //   if (member) {
      //     member
      //       .kick('misbehaving')
      //       .then((member) => msg.channel.send(`Bye ${member}.`))
      //       .catch((err) => {
      //         console.error(err);
      //         msg.channel.send('This member is an admin. No can do.');
      //       });
      //   } else {
      //     msg.channel.send('That member was not found.');
      //   }
      // } else if (command === 'ban') {
      //   if (!msg.member.hasPermission('BAN_MEMBERS'))
      //     return msg.reply('You do not have permissions to use that command.');
      //   if (args.length === 0) return msg.reply('Please provide ID');

      //   msg.guild.members.ban(args[0]).catch((err) => console.log(err));
      // }

      // console.log(`[${msg.author.tag}]: ${msg.content}`);

      let embed = new Discord.MessageEmbed()
        .setTitle('kick')
        .setDescription('bye')
        .setColor('blue')
        .setFooter('yes');
      return message.channel.send(embed);
    } catch (error) {
      console.error(error);
    }
  },
};
