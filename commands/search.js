const { MessageEmbed } = require('discord.js');
const User = require('../models/user');
const Request = require('../models/request');

const foundGameMsg = new MessageEmbed()
  .setTitle('PLaceholder Title')
  .setDescription(
    'Awesome, next question I need to know to match you. \n2. How long do you want to play for?'
  )
  .setColor('blue')
  .setFooter(
    'Please select the emoji that best matches your time frame.\n\n💙  <30m \n💚  <1hr \n❤️  1hr+ \n💛  3hr+'
  );

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

      // let msg = await message.author.send(
      //   `We found ${req.length} match. Would you like to send them a message? `
      // );

      const newMsg = await message.author
        .send(`We found ${req.length} match. Would you like to send them a message? `)
        .then((embedMsg) => {
          embedMsg.react('👍');
          embedMsg.react('👎');

          embedMsg
            .awaitReactions(
              (reaction, user) =>
                user.id == message.author.id &&
                (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
              { max: 1, time: 60000 }
            )
            .then((reaction) => {
              message.author.send('aslkdjflasdfl');
              // processReaction(reaction.first().emoji.name);
            })
            .catch(() => {
              message.author.send('No reaction after 60 seconds, operation canceled');
            });
        });
      // req returns an array of all the games found
      // check with team tomrorow to see if we should return random match
      if (req.length === 0) message.reply('no game found sorry fam');
    } catch (error) {
      console.error(error);
    }
  },
};
