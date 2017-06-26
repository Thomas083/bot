module.exports = member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Soit le bienvenue ${member.user.username} sur le serveur de Dalyone`);
};
