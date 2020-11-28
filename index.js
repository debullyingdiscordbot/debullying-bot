require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Dig through commands directory for all the command files ending in .js
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Using '!' for development, need a diff prefix for production
const PREFIX = '!';

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log(`Bot: ${client.user.tag}!`);
});

// Welcomes new member to server by DM
client.on('guildMemberAdd', (member) => {
  member.send(
    'Welcome to the server. (Placeholder). Rule 1: Must behave Rule 2: Rule 3: ipsum lorem.... Answer these questions. Will you behave?.. (bot will ask a few verification questions?'
  );
});

// Most of the magic happens here
client.on('message', (msg) => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
  processCommand(msg);

  // TODOS: Move the big ole chunk of text into their own commands under ./commands/
  // if (command === 'kick') {
  //   if (!msg.member.hasPermission('KICK_MEMBERS'))
  //     return msg.reply('You do not have permissions to use that command.');
  //   if (args.length === 0) return msg.reply('Please provide ID');

  //   const member = msg.guild.members.cache.get(args[0]);

  //   if (member) {
  //     member
  //       .kick('misbehaving')
  //       .then((member) => msg.channel.send(`Bye ${member}.`))
  //       .catch((err) => {
  //         console.error(err);
  //         msg.channel.send('This member is an admin. No can do.');
  //       });
  //   } else {
  //     msg.channel.send('That member was not found.');
  //   }
  // } else if (command === 'ban') {
  //   if (!msg.member.hasPermission('BAN_MEMBERS'))
  //     return msg.reply('You do not have permissions to use that command.');
  //   if (args.length === 0) return msg.reply('Please provide ID');

  //   msg.guild.members.ban(args[0]).catch((err) => console.log(err));
  // }

  // console.log(`[${msg.author.tag}]: ${msg.content}`);
});

// Process the requested command
function processCommand(message) {
  const [commandName, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  if (!client.commands.has(commandName))
    return message.reply(
      'there was an error trying to execute that command! Try `!commands`'
    );

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    // console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
}
