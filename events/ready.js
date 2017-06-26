module.exports = bot => {
  bot.user.setStatus("online");
  bot.user.setGame("//help pour les infos", "https://www.twitch.tv/dalyonetv");
  console.log("J\'ai bien réussis a me connecté");
}
