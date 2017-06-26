exports.run = (bot, message) => {
  message.channel.sendMessage('youtube')
    .then(msg => {
      msg.edit("```Lien Youtube : \n\n https://www.youtube.com/channel/UCeKsyUFzA8nuECmGJD-TwXw \n ```");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'youtube',
  description: 'Affiche le lien de la chaine youtube',
  usage: 'youtube'
};
