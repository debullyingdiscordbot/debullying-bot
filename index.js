require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const moment = require('moment');
// const mongoose = require('mongoose');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');
client.logger = require('./utils/Logger');

const newUsers = new Discord.Collection();

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

// Using '!' for development, need a diff prefix for production
const PREFIX = '!';
// testing the below
client.on('guildMemberAdd', (member) => {
  member.send('testing');
});

client.on('guildMemberRemove', (member) => {
  console.log('sdlfsldkjflskdfjk');
  // member.reply('testing');
});

client.mongoose.init();
client.login(process.env.BOT_TOKEN);

//For any unhandled errors
process.on('unhandledRejection', (err) => {
  console.error(err);
});
