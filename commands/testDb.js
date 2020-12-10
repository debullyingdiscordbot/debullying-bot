const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  name: 'testdb',
  description: 'testing db connection',
  async execute(message, args, client) {
    console.log(message.author);

    const user = new User({
      _id: mongoose.Types.ObjectId(),
      userid: message.author.id,
      username: message.author.username,
    });

    try {
      await user.save();
    } catch (error) {
      console.error(error);
    }
  },
};
