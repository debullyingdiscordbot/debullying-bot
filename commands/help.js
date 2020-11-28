module.exports = {
  name: 'help',
  description: 'Help options.',
  execute(message, args) {
    if (!args.length) {
      // TODOS: Add help topics..?
      message.channel.send('What? try `!help [topic]` this is a WIP');
    } else {
      message.channel.send('Work in progress.');
    }
  },
};

// help command takes multiple args
function helpCommand(args) {}
