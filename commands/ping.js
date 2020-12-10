const User = require('../models/user');

module.exports = {
  name: 'ping',
  description: 'Ping!',

  async execute(message, args, client) {
    message.author.send('hiya');
    message.channel.send('pong?');
    const thing = User.find();
    console.log(thing);
  },
};
