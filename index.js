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
  const guild = member.guild;
  if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
  newUsers[guild.id].set(member.id, member.user);

  if (newUsers[guild.id].size > 10) {
    const userlist = newUsers[guild.id].map((u) => u.toString()).join(' ');
    guild.channels
      .find((channel) => channel.name === 'general')
      .send('Welcome our new users!\n' + userlist);
    newUsers[guild.id].clear();
  }
});

client.on('guildMemberRemove', (member) => {
  const guild = member.guild;
  if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
});

client.mongoose.init();
client.login(process.env.BOT_TOKEN);

//For any unhandled errors
process.on('unhandledRejection', (err) => {
  console.error(err);
});
