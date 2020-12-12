const { MessageEmbed } = require('discord.js');
// const User = require('../models/user');
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
    "Excellent, I'll message here for you match. You'll need to react with an emoji to begin the chat with your match. \nIn the chat, you'll share your info in order to begin playing! If you don't have a match within 10 minutes I'll message to see if you want to keep waiting or change anything up."
  )
  .setColor('blue')
  .setFooter('footer goes here');

module.exports = {
  name: 'match',
  description: 'Matchmake for a game.',

  async execute(message, args, client) {
    // todo: turn the msg and filter into a reusable method later when refactoring. there gonna be some loopidooos and stuff.
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

    // console.log(collected);
    // todo: get collect.first().content.toLowerCase() and run it through a method that checks if valid game using the big game API
    // todo:

    if (collected.first().content.toLowerCase() === 'cancel')
      return message.author.send('Canceled');

    if (collected.first().content.toLowerCase() === 'overwatch') {
      const newMsg = await message.author.send(foundGameMsg).then((embedMsg) => {
        embedMsg.react('💙');
        embedMsg.react('💚');
        embedMsg.react('❤️');
        embedMsg.react('💛');

        embedMsg
          .awaitReactions(
            (reaction, user) =>
              user.id == message.author.id &&
              (reaction.emoji.name == '👍' ||
                reaction.emoji.name == '👎' ||
                reaction.emoji.name == '💙' ||
                reaction.emoji.name == '💚'),
            { max: 1, time: 60000 }
          )
          .then((reaction) => {
            // todo: make analyizing emojis a reusable method on its own and save the request to db
            if (reaction.first().emoji.name == '💚') {
              processReaction(reaction.first().emoji.name);
              message.author.send(postReactionMsg);
              // todo: add user to mongo db (username, id, game, and time)
            } else if (reaction.first().emoji.name == '💙') {
              message.author.send(postReactionMsg);
              // console.log(collected);
            } else message.author.send('Operation canceled.');
          })
          .catch(() => {
            message.author.send('No reaction after 60 seconds, operation canceled');
          });
      });

      // const filter = (collected) => collected.author.id === message.author.id;
      // const collected = await newMsg.channel
      //   .awaitMessages(filter, {
      //     max: 1,
      //     time: 50000,
      //   })
      //   .catch(() => {
      //     message.author.send('This request timed out. Try again.');
      //   });

      // console.log(collected);
    }

    // message.author.send('Done !');

    // helper
    const processReaction = (reaction) => {
      // console.log(reaction);
      // todo: check to see if user already have existing request before processing
      let time;
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

      // case statement for different heart reactions

      // save request into mongo db in request model
      const queue = new Request({
        user: `${message.author.username}#${message.author.discriminator}`,
        game: collected.first().content.toUpperCase(),
        timeframe: time,
      });

      try {
        queue.save();
      } catch (error) {
        console.error(error);
      }
    };
  },
};
