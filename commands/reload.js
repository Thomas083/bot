exports.run = (bot, message, args) => {
  let command;
  if (bot.commands.has(args[0])) {
    command = args[0];
  } else if (bot.aliases.has(args[0])) {
    command = bot.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.sendMessage(`I cannot find the command: ${args[0]}`);
  } else {
    message.channel.sendMessage(`Reloading: ${command}`)
      .then(m => {
        bot.reload(command)
          .then(() => {
            m.edit(`Successfully reloaded: ${command}`);
          })
          .catch(e => {
            m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Reload la commande choisis.',
  usage: 'reload <commandname>'
};
