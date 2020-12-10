const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'match',
  description: 'Matchmake for a game.',

  async execute(message, args, client) {
    let embed = new MessageEmbed()
      .setTitle('Title goes here')
      .setDescription(
        "Welcome, let's get you paired to play. I have 2 questions I need answers for. \n1. What game do you want to play? Please type out the exact title."
      )
      .setColor('blue')
      .setFooter('footer goes here');

    const msg = await message.author.send(embed);

    const filter = (collected) => collected.author.id === message.author.id;
    const collected = await msg.channel
      .awaitMessages(filter, {
        max: 1,
        time: 50000,
      })
      .catch(() => {
        message.author.send('Timeout');
      });

    if (collected.first().content === 'cancel') return message.author.send('Canceled');
    message.author.send('Done !');
  },
};
