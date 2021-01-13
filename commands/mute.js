const { MessageEmbed } = require('discord.js');
const { increaseMuteCount } = require('../database/MongoDB');

module.exports = {
  name: 'mute',
  description: 'Mute the member.',

  async execute(message, args, client) {
    try {
      if (!message.member.hasPermission('MUTE_MEMBERS'))
        return message
          .reply(muteMsg('You do not have permissions to use that command.'))
          .then((m) => m.delete({ timeout: 5000 }));
      if (args.length === 0)
        return message
          .reply(muteMsg('Please provide ID'))
          .then((m) => m.delete({ timeout: 5000 }));

      const member = message.guild.members.cache.get(args[0]);

      if (member) {
        await increaseMuteCount(member.user.id);
        member.voice.setMute(true, 'misbehaving');
      } else {
        message.channel.send('That member was not found.');
      }

      // return message.channel.send(embed);
    } catch (error) {
      console.error(error);
    }
  },
};

const muteMsg = (msg) =>
  new MessageEmbed().setDescription(msg).setColor(process.env.EMBED_COLOR);
