exports.run = function(client, message, args) {
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'purge',
  description: 'Supprime un nombre définie de message dans le channel choisit.',
  usage: 'purge <number>'
};
