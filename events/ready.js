module.exports = async (client) => {
  try {
    client.user.setPresence({
      activity: { name: ' your every move', type: 'WATCHING' },
      status: 'online',
    });
    client.logger.ready(`${client.user.tag} is now up and running!`);
  } catch (e) {
    console.log(e);
  }
};
