const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  name: 'testdb',
  description: 'testing db connection',
  async execute(message, args, client) {
    console.log(message.author);

    // todos: search db if user exist, if not, create
    const user = new User({
      userid: message.author.id,
      username: `${message.author.username}#${message.author.discriminator}`,
    });

    try {
      await user.save();
    } catch (error) {
      console.error(error);
    }
  },
};
