const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Ping!',

  async execute(message, args, client) {
    let embed = new Discord.MessageEmbed()
      .setTitle('booty')
      .setDescription('wubba lubba')
      .setColor('blue')
      .setFooter('yes?');

    console.log(client.users);
    const user = client.users.cache.get('785651262137303050');
    user.send('testing');
    return message.channel.send(embed);
  },
};

// exports.run = (client, message, args) => {
//   message.channel.send('Pong!').catch(console.error);
// };

// exports.help = {
//   name: 'ping',
// };
