const { MessageEmbed } = require('discord.js');
const { findOrCreateUser } = require('../database/MongoDB');

const welcomeMsg = (guild) => {
  return new MessageEmbed()
    .setTitle(`Come with me if you want to play.`)
    .setDescription(
      `
      Server: ${guild}
      Hey, there!

Thanks for hitting me up! Let’s find your Player 2.

Just one rule: **don’t be an asshole**. We’re out there to support each other on the simple art going online and playing video games. Let’s make it a safer experience together.
If you feel like there’s an unsafe moment for you and your fellow player, be sure to check in on them in their DMs. But other than that, have fun!

Here are a few commands to get started...

!match
!search <game>
!warn <user id>
!ban <user id>
!serverinfo
!viewrep <user id>
!commands
    `
    )
    .setFooter(
      `
    
    “Hasta la vista, baby.
- The Affirminator”
    `
    )
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
