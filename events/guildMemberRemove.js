const { MessageEmbed } = require('discord.js');

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === 'general'
  );
  if (!channel) return;

  const embedMsg = new MessageEmbed()
    .setTitle(`A member has departed`)
    .setDescription(`${member} has left the server`)
    .setColor(process.env.EMBED_COLOR);

  channel.send(embedMsg);
};
