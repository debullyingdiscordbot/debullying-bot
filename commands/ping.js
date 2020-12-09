const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Ping!',

  async execute(message, args, client) {
    // let embed = new Discord.MessageEmbed()
    //   .setTitle('title')
    //   .setDescription('wubba lubba dub dub')
    //   .setColor('blue')
    //   .setFooter('footer');

    message.author.send('hiya');
    message.channel.send('pong?');
  },
};
