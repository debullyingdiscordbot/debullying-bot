module.exports = {
  name: 'help',
  description: 'Help options.',
  execute(message, args) {
    // helpCommand(message, args);
    if (!args.length) {
      message.channel.send('What? try `!help [topic]`');
    } else {
      // helpCommand(args)
      message.channel.send('Work in progress.');
    }
  }
};

// help command takes multiple args
function helpCommand(args) {}
