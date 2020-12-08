module.exports = async (client, member) => {
  // let userLogs = member.guild.channels.find((c) => c.name === 'user_logs');

  // const newProfile = {
  //   guildID: member.guild.id,
  //   guildName: member.guild.name,
  //   userID: member.id,
  //   username: member.user.tag,
  // };

  // try {
  //   await client.createProfile(newProfile);
  // } catch (err) {
  //   console.error(err);
  // }

  console.log(member);
  console.log(client);

  // client.users.cache.get('id').send('Blabla')

  // userLogs.send(
  //   `Welcome to ${member.guild}, ${member.user.tag}. (Placeholder). Rule 1: Must behave Rule 2: Rule 3: ipsum lorem.... Answer these questions. Will you behave?.. (bot will ask a few verification questions?**!`
  // );
};
