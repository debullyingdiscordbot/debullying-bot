module.exports = async (client) => {
  try {
    client.user.setPresence({
      activity: { name: "...I'll be back. Once I find your Player 2." },
      // activity: { name: ' your every move', type: 'WATCHING' },
      status: 'online',
    });
    client.logger.ready(`${client.user.tag} is now up and running!`);
  } catch (e) {
    console.log(e);
  }
};
