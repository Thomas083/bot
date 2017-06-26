exports.run = (bot, message) => {
  message.channel.sendMessage('twitch')
    .then(msg => {
      msg.edit("```Lien Twitch : \n\n https://www.twitch.tv/dalyonetv \n ```");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'twitch',
  description: 'Affiche le lien de la chaine twitch',
  usage: 'twitch'
};
