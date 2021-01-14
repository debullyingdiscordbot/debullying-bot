const { MessageEmbed } = require('discord.js');
const {
  findOrCreateUser,
  createRequest,
  checkDbForMatch,
  getUserMatchFeedback,
} = require('../database/MongoDB');

module.exports = {
  name: 'match',
  description: 'Matchmake for a game.',

  async execute(message, args, client) {
    // todo: check user in database and see if they're in the green, if not, return sorry message
    let user = await findOrCreateUser(message.author);
    message.delete({ timeout: 1000 });
    if (user.banCount >= 3 || user.kickCount >= 3)
      return message.author.send(
        embedMessage(`You are ineligible to use this service at the moment. 
      
      Ban count: ${user.banCount}
      Kick count: ${user.kickCount}
      
      Please wait X days for those to cool down.`)
      );

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
    let selectedGame = collected.first().content.toLowerCase();

    if (selectedGame === 'cancel') {
      return message.author.send('Canceled');
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
              message.author.send(
                embedMessage(
                  'Sorry, we timed out! Wanna try again? Just ping me back in your server!'
                )
              );
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
      // check if another user in the Request collection wants to play the same game for same time
      const found = await checkDbForMatch(time, selectedGame);
      if (Array.isArray(found) && found.length) {
        await linkUpWithMatch(found);
      } else {
        addRequestToDb(time);
      }
    };

    const linkUpWithMatch = async (foundMatches) => {
      try {
        await message.author.send(foundPlayersMsg(foundMatches.length)).then((msg) => {
          msg.react('👍');
          msg.react('👎');

          msg
            .awaitReactions(
              (reaction, user) =>
                user.id == message.author.id &&
                (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
              { max: 1, time: 60000 }
            )
            .then((reaction) => {
              if (reaction.first().emoji.name == '👍') {
                // todo: send them name of random match
                const randomMatch =
                  foundMatches[Math.floor(Math.random() * foundMatches.length)];
                message.author.send(
                  embedMessage(
                    `Slide into **${randomMatch.username}**'s DMs. I will ping them as well.`
                  )
                );
                // sends message to match letting them know match found
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
                // todo: send farewell cya bye bye msg
                message.author.send(embedMessage('bye? or add them to db??'));
              }
            })
            .catch((err) => {
              client.logger.error(err);
              message.author.send(
                embedMessage(
                  'Sorry, we timed out! Wanna try again? Just ping me back in your server!'
                )
              );
            });
        });
      } catch (error) {
        console.error(error);
      }
    };

    const addRequestToDb = async (time) => {
      try {
        // todo: user field for botCalledAmount can be user.request.length

        let game = collected.first().content.toLowerCase();

        // await findOrCreateUser(message.author);
        await createRequest(message, game, time);

        message.author.send(postReactionMsg);
        // .then((msg) => {
        //   msg.react('👍');
        //   msg.react('👎');

        //   msg
        //     .awaitReactions(
        //       (reaction, user) =>
        //         user.id == message.author.id &&
        //         (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
        //       { max: 1, time: 60000 }
        //     )
        //     .then((reaction) => {
        //       getUserMatchFeedback(reaction.first().emoji.name, message.author.id);
        //     })
        //     .catch((err) => {
        //       client.logger.error(err);
        //       message.author.send('No reaction after 60 seconds, operation canceled');
        //     });
        // });
      } catch (error) {
        console.error(error);
      }
    };
  },
};

// different embeded messages

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
        `Awesome, thanks!
        
        *Next, for how long do you want to play for?*`
      )
      .setColor(process.env.EMBED_COLOR)
      // todo: add thumbnail??
      // .setThumbnail(message.guild.iconURL())
      .setFooter(
        'Tip: Please select the emoji that best matches your time frame.\n\n💙  <30m \n💚  <1hr \n❤️  1hr+ \n💛  3hr+'
      )
  );
};
const greetingMsg = new MessageEmbed()
  .setTitle("Hey there! Let's find your Player 2!")
  .setDescription(
    `Can you answer two questions for me?.

     *First, Which game do you want to play?*`
  )
  .setColor(process.env.EMBED_COLOR)
  .setFooter('Tip: Type out exact title');

const postReactionMsg = new MessageEmbed()
  .setTitle("I'll DM you for your match as soon as I can.")
  .setDescription('Once I do, you can emoji react to get the connection info.')
  .setColor(process.env.EMBED_COLOR);
// .setFooter('Did you enjoy your last match?');

const foundPlayersMsg = (amount) =>
  new MessageEmbed()
    .setTitle(`${amount} matches found.`)
    .setDescription(`Sweet, we found ${amount} matches. Want me to connect you?`)
    .setColor(process.env.EMBED_COLOR);

// todo: refactor all that crap above this line to a reusable method below
const embedMessage = (description) =>
  new MessageEmbed()
    // .setTitle(description)
    .setDescription(description)
    .setColor(process.env.EMBED_COLOR);
// .setFooter(footer);
