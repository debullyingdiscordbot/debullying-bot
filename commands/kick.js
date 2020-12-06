const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  name: 'kick',
  description: 'Kick the member.',

  async execute(message, args) {
    try {
      // console.log()

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
