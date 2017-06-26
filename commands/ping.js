exports.run = (bot, message) => {
  message.channel.sendMessage('Ping?')
    .then(msg => {
      msg.edit(`Pong! (Vous avez : ${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong commande. Je sais pas ce que cela fait /sarcasme',
  usage: 'ping'
};
