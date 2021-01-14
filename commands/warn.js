const { MessageEmbed } = require('discord.js');
const { increaseWarnCount, returnWarnCount } = require('../database/MongoDB');

module.exports = {
  name: 'warn',
  description: 'Warn the member.',

  async execute(message, args, client) {
    try {
      // if (!message.member.hasPermission('MUTE_MEMBERS'))
      //   return message
      //     .reply(muteMsg('You do not have permissions to use that command.'))
      //     .then((m) => m.delete({ timeout: 5000 }));
      if (args.length === 0)
        return message
          .reply(warnMsg('Please provide ID of member.'))
          .then((m) => m.delete({ timeout: 5000 }));

      const member = message.guild.members.cache.get(args[0]);

      if (member) {
        await increaseWarnCount(member.user.id);
        message.channel.send(warnMsg(`<@${member.id}> has been warned.`));
        // .then((m) => m.delete({ timeout: 10000 }));

        let warnCount = await returnWarnCount(member.id);

        member.send(
          embedMsg(`You've been warned by another user for misbehaving. X more warnings and you will not be able to use The Affirminator's services.
        
        Warn count: ${warnCount}`)
        );
      } else {
        message.channel
          .send(embedMsg('That member was not found.'))
          .then((m) => m.delete({ timeout: 5000 }));
      }
    } catch (error) {
      console.error(error);
    }
  },
};

const embedMsg = (msg) =>
  new MessageEmbed().setDescription(msg).setColor(process.env.EMBED_COLOR);
