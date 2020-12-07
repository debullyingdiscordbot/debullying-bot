require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');

const client = new Discord.Client();
client.commands = new Discord.Collection();
// client.data = require('./utils/mongoose');
client.logger = require('./utils/Logger');

// Dig through commands directory for all the command files ending in .js
const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Using '!' for development, need a diff prefix for production
const PREFIX = '!';

// EVENTS
// todo: move these events into its own directory
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
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
}

// Connect to db
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family: 4,
  })
  .then(() => {
    client.logger.log('Connected to mongooo db.', 'log');
  })
  .catch((err) => {
    client.logger.log(`Error connecting to db. Error: ${err}`, 'error');
  });
client.login(process.env.BOT_TOKEN);

client
  .on('disconnect', () => client.logger.log('Bot is disconnecting...', 'warn'))
  .on('reconnecting', () => client.logger.log('Bot reconnecting...', 'log'))
  .on('error', (e) => client.logger.log(e, 'error'))
  .on('warn', (info) => client.logger.log(info, 'warn'));

//For any unhandled errors
process.on('unhandledRejection', (err) => {
  console.error(err);
});
