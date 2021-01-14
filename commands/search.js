const { MessageEmbed } = require('discord.js');
const User = require('../database/models/user');
const Request = require('../database/models/request');
// const {} = require('../database/MongoDB')

module.exports = {
  name: 'search',
  description: 'search db for players playing game',
  async execute(message, args, client) {
    try {
      const req = await Request.find({
        game: args.join(' ').toLowerCase(),
      });

      message.author.send(SearchingMsg());
      if (req.length === 0) return message.author.send(noMatchMsg(args.join(' ')));
      const newMsg = await message.author
        .send(foundGameMsg(req.length))
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
                const randomMatch = req[Math.floor(Math.random() * req.length)];
                message.author.send(foundMatchMsg(randomMatch.username));
                client.users
                  .fetch(randomMatch.userId)
                  .then((user) =>
                    user.send(
                      embedMessage(
                        `A match has been found. Slide into **${message.author.username}#${message.author.discriminator}**'s DMs`
                      )
                    )
                  );
              } else {
                message.author.send('aslkdjflasdfl');
              }
            })
            .catch((err) => {
              console.error(err);
              message.author.send('No reaction after 60 seconds, operation canceled');
            });
        });
    } catch (error) {
      console.error(error);
    }
  },
};

// todo: move all the message methods into another file??
const SearchingMsg = () => {
  return new MessageEmbed()
    .setTitle('Searching for Players 🔎')
    .setDescription(`placeholder`)
    .setFooter('Tip: Stretch your hands out. This might take some time.')
    .setColor(process.env.EMBED_COLOR);
};

const foundGameMsg = (matches) => {
  return new MessageEmbed()
    .setTitle(`We found ${matches} match${matches === 1 ? '' : 'es'}`)
    .setDescription(
      `${
        matches === 1
          ? 'Would you like to connect with them?'
          : 'Would you like to connect with one of them?'
      }`
    )
    .setColor(process.env.EMBED_COLOR);
};
const foundMatchMsg = (player) => {
  return new MessageEmbed()
    .setTitle(`Enjoy your game`)
    .setDescription(
      `Go ahead and send a message to **${player}**. I will notify them about you as well. (not yet implemented)`
    )
    .setColor(process.env.EMBED_COLOR);
};

const noMatchMsg = (game) => {
  return new MessageEmbed()
    .setTitle(`No Player Found.`)
    .setDescription(`No one is playing ${game} at the moment.`)
    .setFooter('Tip: Use !match to add a request to the queue or try a different game.')
    .setColor(process.env.EMBED_COLOR);
};

const embedMessage = (message) =>
  new MessageEmbed().setDescription(message).setColor(process.env.EMBED_COLOR);
