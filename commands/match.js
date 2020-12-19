const { MessageEmbed } = require('discord.js');
const { createRequest } = require('../database/MongoDB');

const foundGameMsg = (game) => {
  return (
    new MessageEmbed()
      // titlecase the game
      .setTitle(
        game
          .split('_')
          .filter((x) => x.length > 0)
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(' ')
      )
      .setDescription(
        'Awesome, next question I need to know to match you. \n2. How long do you want to play for?'
      )
      .setColor('blue')
      .setFooter(
        'Please select the emoji that best matches your time frame.\n\n💙  <30m \n💚  <1hr \n❤️  1hr+ \n💛  3hr+'
      )
  );
};
const greetingMsg = new MessageEmbed()
  .setTitle('placeholder title')
  .setDescription(
    "Welcome, let's get you paired to play. I have 2 questions I need answers for. \n1. What game do you want to play? Please type out the exact title."
  )
  .setColor('blue')
  .setFooter('placeholder footer');

const postReactionMsg = new MessageEmbed()
  .setTitle('Title goes here')
  .setDescription(
    "Excellent, I'll message here for your match. You'll need to react with an emoji to begin the chat with your match. \nIn the chat, you'll share your info in order to begin playing! If you don't have a match within 10 minutes I'll message to see if you want to keep waiting or change anything up."
  )
  .setColor('blue')
  .setFooter('footer goes here');

// todo: refactor all that crap above this line to a reusable method below
const embedMessage = (title, description, sideColor, footer) => {
  new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(sideColor)
    .setFooter(footer);
};

module.exports = {
  name: 'match',
  description: 'Matchmake for a game.',

  async execute(message, args, client) {
    // todo: check user in database and see if they're in the green, if not, return sorry message
    const msg = await message.author.send(greetingMsg);
    const filter = (collected) => collected.author.id === message.author.id;
    const collected = await msg.channel
      .awaitMessages(filter, {
        max: 1,
        time: 60000,
      })
      .catch(() => {
        message.author.send('This request timed out. Try again.');
      });

    // todo: get collect.first().content.toLowerCase() and run it through a method that checks if valid game using the big game API
    // todo:
    let selectedGame = collected.first().content.toLowerCase();

    if (selectedGame === 'cancel') {
      return message.author.send('Canceled');
      // } else if (collected.first().content.toLowerCase() === a valid game from the api) {
    } else {
      const newMsg = await message.author
        .send(foundGameMsg(selectedGame))
        .then((embedMsg) => {
          embedMsg.react('💙');
          embedMsg.react('💚');
          embedMsg.react('❤️');
          embedMsg.react('💛');

          embedMsg
            .awaitReactions(
              (reaction, user) =>
                user.id == message.author.id &&
                (reaction.emoji.name == '💙' ||
                  reaction.emoji.name == '💚' ||
                  reaction.emoji.name == '❤️' ||
                  reaction.emoji.name == '💛'),
              { max: 1, time: 60000 }
            )
            .then((reaction) => {
              processReaction(reaction.first().emoji.name);
            })
            .catch(() => {
              message.author.send('No reaction after 60 seconds, operation canceled');
            });
        });
    }

    // helpers
    const processReaction = async (reaction) => {
      let time;
      // case statement for different heart reactions
      switch (reaction) {
        case (reaction = '💙'):
          time = 30;
          break;
        case (reaction = '💚'):
          time = 60;
          break;
        case (reaction = '❤️'):
          time = 120;
          break;
        case (reaction = '💛'):
          time = 180;
          break;
        default:
          time = 0;
      }
      // TODO: method to check if another user in the Request collection wants to play the same game for same time
      // checkDbForMatch() ????????????????????

      try {
        // todo: link relationship between request and user
        // todo: user field for botCalledAmount can be user.request.length

        // console.log(message.guild);

        let game = collected.first().content.toLowerCase();

        await createRequest(message, game, time);

        await message.author.send(postReactionMsg);
      } catch (error) {
        console.error(error);
      }
    };
  },
};
