module.exports = async (client, message) => {
  if (!message.guild) return;

  if (message.author.bot) return;
  // if (message.content.indexOf(settings.prefix) !== 0) return;
  // if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.execute(message, args, client);
};
