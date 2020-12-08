require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');
client.logger = require('./utils/Logger');

// async function init() {
// }
// Load events
fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});
// Load commands
fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split('.')[0];
    console.log(`Loaded command '${cmdName}'`);
    client.commands.set(cmdName, props);
  });
});

// Dig through commands directory for all the command files ending in .js
// const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);
//   client.commands.set(command.name, command);
// }

// Using '!' for development, need a diff prefix for production
const PREFIX = '!';

// EVENTS
// todo: move these events into its own directory
// client.on('ready', () => {
//   console.log(`Bot: ${client.user.tag}!`);
// });

// Welcomes new member to server by DM
// client.on('guildMemberAdd', (member) => {
//   member.send(
//     'Welcome to the server. (Placeholder). Rule 1: Must behave Rule 2: Rule 3: ipsum lorem.... Answer these questions. Will you behave?.. (bot will ask a few verification questions?'
//   );
// });

// Most of the magic happens here
// client.on('message', (msg) => {
//   if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
//   processCommand(msg);
// });

// Process the requested command
// function processCommand(message) {
//   const [commandName, ...args] = message.content
//     .trim()
//     .substring(PREFIX.length)
//     .split(/\s+/);

//   if (!client.commands.has(commandName))
//     return message.reply(
//       'there was an error trying to execute that command! Try `!commands`'
//     );

//   const command = client.commands.get(commandName);

//   try {
//     command.execute(message, args);
//   } catch (error) {
//     console.error(error);
//     message.reply('there was an error trying to execute that command!');
//   }
// }

client.mongoose.init();
client.login(process.env.BOT_TOKEN);

//For any unhandled errors
process.on('unhandledRejection', (err) => {
  console.error(err);
});
