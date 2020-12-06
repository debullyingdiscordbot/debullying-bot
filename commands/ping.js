const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Ping!',

  async execute(message, args) {
    let embed = new Discord.MessageEmbed()
      .setTitle('booty')
      .setDescription('wubba lubba')
      .setColor('blue')
      .setFooter('yes?');
    return message.channel.send(embed);
  },
};
