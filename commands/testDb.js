const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  name: 'testdb',
  description: 'testing db connection',
  execute(message, args, client) {
    // try {

    console.log(message);
    const user = new User({
      id: message.author.id,
      name: message.author.username,
      // registeredAt: Data.now(),
    });

    console.log(user);
    // user
    //   .save()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // } catch (error) {
    //   console.error(error);
    // }

    user.save(function (err, doc) {
      if (err) return console.error(err);
      console.log('Document inserted succussfully!');
    });
  },
};
