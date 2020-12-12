const { MessageEmbed } = require('discord.js');

const foundGameMsg = new MessageEmbed()
  .setTitle('Title goes here')
  .setDescription(
    'Awesome, next question I need to know to match you. \n2. How long do you want to play for? Please select the emoji that best matches your time frame.'
  )
  .setColor('blue')
  .setFooter('💙  <30m \n  💚  <1hr \n ❤️  1hr+ \n 💛  3hr+');

const greetingMsg = new MessageEmbed()
  .setTitle('Title goes here')
  .setDescription(
    "Welcome, let's get you paired to play. I have 2 questions I need answers for. \n1. What game do you want to play? Please type out the exact title."
  )
  .setColor('blue')
  .setFooter('footer goes here');

module.exports = {
  name: 'match',
  description: 'Matchmake for a game.',

  async execute(message, args, client) {
    // todo: turn the msg and filter into a reusable method later when refactoring. there gonna be some loopidooos and stuff.
    const msg = await message.author.send(greetingMsg);
    // .react('👍')
    const filter = (collected) => collected.author.id === message.author.id;
    const collected = await msg.channel
      .awaitMessages(filter, {
        max: 1,
        time: 50000,
      })
      .catch(() => {
        message.author.send('This request timed out. Try again.');
      });

    // console.log(collected);

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
            { max: 1, time: 30000 }
          )
          .then((reaction) => {
            // todo: make analyizing emojis a reusable method on its own
            if (reaction.first().emoji.name == '💚') {
              message.author.send('green heart...');
              // client.destroy();
              console.log('triggered');
            } else if (reaction.first().emoji.name == '💙') {
              message.author.send('blue heart clicked');
              console.log(collected);
            } else message.author.send('Operation canceled.');
          })
          .catch(() => {
            message.reply('No reaction after 30 seconds, operation canceled');
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

    message.author.send('Done !');
  },
};
