module.exports = async (client, message) => {
  if (!message.guild) return;

  if (message.author.bot) return;
  // if (message.content.indexOf(settings.prefix) !== 0) return;
  // if (message.content.indexOf(settings.prefix) !== 0) return;

  // todos: move the prefix thing to .env
  const args = message.content.slice('!'.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  // console.log(client);
  cmd.execute(message, args, client);
  // cmd.execute(client, message, args);
};
