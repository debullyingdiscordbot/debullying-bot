const { MessageEmbed } = require('discord.js');
const { findOrCreateUser } = require('../database/MongoDB');

const welcomeMsg = (guild) => {
  return new MessageEmbed()
    .setTitle(`Welcome to ${guild}`)
    .setDescription(
      `
      list some rules here
      list some commands here
    `
    )
    .setFooter('Have fun and -----')
    .setColor(process.env.EMBED_COLOR);
};

module.exports = async (client, member) => {
  await findOrCreateUser(member.user);

  client.logger.event(
    `${member.user.username}#${member.user.discriminator} has joined ${member.guild.name}.`
  );

  member.send(welcomeMsg(member.guild.name));

  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === 'general'
  );
  if (!channel) return;

  const joinembed = new MessageEmbed()
    .setTitle(`A new member just arrived!`)
    .setDescription(`Welcome ${member} we hope you enjoy your stay here!`)
    .setColor(process.env.EMBED_COLOR);

  channel.send(joinembed);
};
