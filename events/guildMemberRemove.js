module.exports = member => {
  let guild = member.guild;
  guild.channels.get('264791402007887872').sendMessage(`${member.user.username} vient de quitter le serveur de Dalyone`);
};
