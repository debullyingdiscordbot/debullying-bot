module.exports = (client, member) => {
  let userLogs = member.guild.channels.find((c) => c.name === 'user_logs');

  userLogs.send(
    `Welcome to ${member.guild}, ${member.user.tag}. (Placeholder). Rule 1: Must behave Rule 2: Rule 3: ipsum lorem.... Answer these questions. Will you behave?.. (bot will ask a few verification questions?**!`
  );
};
