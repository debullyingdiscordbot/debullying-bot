const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  name: 'testdb',
  description: 'testing db connection',
  async execute(message, args, client) {
    console.log(message.author);

    // todos: search db if user exist, if not, create

    try {
      const filter = { userid: message.author.id };
      const update = {
        username: `${message.author.username}#${message.author.discriminator}`,
      };
      await User.findOneAndUpdate(
        filter,
        update
        //   , {
        //   new: true,
        //   upsert: true,
        // }
      );
      if (!user) {
        const newUser = new User({
          userid: message.author.id,
          username: `${message.author.username}#${message.author.discriminator}`,
        });
        await newUser.save();
      }
      // console.log(user);
    } catch (error) {
      console.error(error);
    }
  },
};
