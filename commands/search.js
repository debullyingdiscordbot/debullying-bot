const User = require('../models/user');
const Request = require('../models/request');

module.exports = {
  name: 'search',
  description: 'search db for players playing game',
  async execute(message, args, client) {
    console.log(args);

    try {
      const req = await Request.find({
        game: args.join(' ').toLowerCase(),
      });

      console.log(req);
      if (req.length === 0) message.reply('no game found sorry fam');
    } catch (error) {
      console.error(error);
    }
  },
};
