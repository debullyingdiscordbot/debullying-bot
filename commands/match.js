const Discord = require('discord.js');

module.exports = {
  name: 'match',
  description: 'Matchmake for a game.',

  async execute(message, args, client) {
    let embed = new Discord.MessageEmbed()
      .setTitle('Title goes here')
      .setDescription(
        "Welcome, let's get you paired to play. I have 2 questions I need answers for. \n1. What game do you want to play? Please type out the exact title."
      )
      .setColor('blue')
      .setFooter('footer goes here');

    // message.author.send(
    //   "Welcome, let's get you paired to play. I have 2 questions I need answers for. \n1. What game do you want to play? Please type out the exact title."
    // );

    return message.author.send(embed);
  },
};
