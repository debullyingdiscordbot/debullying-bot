module.exports = async (client, message) => {
  console.log(process.env.PREFIX);
  if (!message.guild) return;

  if (message.author.bot) return;

  // TODO: figure out whats wrong with process.env.prefix.. or change up the way prefix is done
  const args = message.content.slice('!'.length).trim().split(/ +/g);
  // const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.execute(message, args, client);
};
