const { MessageEmbed } = require('discord.js');
const User = require('../database/models/user');

module.exports = {
  name: 'ping',
  description: 'Ping!',

  async execute(message, args, client) {
    message.author.send(msg1);
    message.author.send(msg2);
    // message.channel.send('pong?');
    const thing = User.find();
    console.log(thing);
  },
};

const msg1 = new MessageEmbed().setTitle('the slow brown fox tripped over the branch');

const msg2 = new MessageEmbed().setDescription('the quick coyote ate the roadrunner');
