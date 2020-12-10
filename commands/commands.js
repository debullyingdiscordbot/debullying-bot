module.exports = {
  name: 'commands',
  description: 'Shows the available commands.',

  execute(message, args, client) {
    message.channel.send(commands);
  },
};

// commands
let commands = [
  '```!command - description.',
  '!command - description',
  '!command [arg1] [arg2] - description.',
  '!command [category] - description.```',
];
