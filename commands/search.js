const { MessageEmbed } = require('discord.js');
const User = require('../database/models/user');
const Request = require('../database/models/request');

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
    try {
      const req = await Request.find({
        game: args.join(' ').toLowerCase(),
      });

      if (req.length === 0) return message.author.send('no game found');
      const newMsg = await message.author
        .send(
          `We found ${req.length} match${
            req.length === 1 ? '' : 'es'
          }. Would you like to send them a message? todo: embed this msg`
        )
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
              if (reaction.first().emoji.name == '👍') {
                const randomMatch = req[Math.floor(Math.random() * req.length)].username;
                message.author.send(
                  `Go ahead and send a message to ${randomMatch}. I will notify them about you as well. (not yet implemented)`
                );
              } else {
                message.author.send('aslkdjflasdfl');
              }
              // processReaction(reaction.first().emoji.name);
            })
            .catch((err) => {
              console.error(err);
              message.author.send('No reaction after 60 seconds, operation canceled');
            });
        });
      // req returns an array of all the games found
      // check with team tomrorow to see if we should return random match
    } catch (error) {
      console.error(error);
    }
  },
};
