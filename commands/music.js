exports.run = (bot, message) => {
  message.channel.sendMessage('music')
    .then(msg => {
      msg.edit("```\n En cours de dev (d'autres commandes sont à venir et pour le moment ça ne sert à rien mais voilà) \n Les différentes commandes sont les suivantes : \n \n //rejoin (le bot rejoindras votre channel) (la commande va changer) \n //leave (le bot partira du channel)  ```");
});

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'music',
  description: 'Affiche les différentes commandes du bot musique',
  usage: 'music'
  };
};
