const Discord = require('discord.js');

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === 'general'
  );
  if (!channel) return;

  const embedMsg = new Discord.MessageEmbed()
    .setTitle(`A new member has departed`)
    .setDescription(`${member} has left the server`)
    .setColor('#FF0000');

  channel.send(embedMsg);
};
