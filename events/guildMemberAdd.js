const { MessageEmbed } = require('discord.js');
const { getUser } = require('../database/MongoDB');

module.exports = async (client, member) => {
  const user = await getUser(member.user);

  // console.log(user);
  member.send('hello there!!!!!!!');

  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === 'general'
  );
  if (!channel) return;

  const joinembed = new MessageEmbed()
    .setTitle(`A new member just arrived!`)
    .setDescription(`Welcome ${member} we hope you enjoy your stay here!`)
    .setColor('#FF0000');

  channel.send(joinembed);
};
