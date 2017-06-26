const settings = require('../settings.json');
exports.run = (bot, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(bot.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.sendCode('asciidoc', `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${bot.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
  } else {
    let command = params[0];
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Ceci donne la liste des commandes disponibles sur le serveur',
  usage: 'help [command]'
};
