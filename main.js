const Discord = require ("discord.js");
const bot = new Discord.Client({autoReconnect: true});
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require ('fs');
const moment = require('moment');
require('./util/eventLoader')(bot);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    bot.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });
      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

bot.elevation = message => {
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

bot.on('warn', e => {
  console.log(e.replace(regToken, 'that was redacted'));
});

bot.on('error', e => {
  console.log(chalk.bgRed(regToken, 'that was redacted'));
});

bot.login(settings.token);


bot.on("message", message=>
  {
    var input = message.content.toUpperCase();
    if (input === "SALUT")
      {
        message.channel.sendMessage('Salut à toi '+message.author+' !');
      }
  //bot.channels.get('276401154626289665').sendMessage('Salut à toi '+message.author+' !');
  });
//       bot.on("message", message =>
//       {
//
//         if (message.content.startsWith("!!say"))
//           {
//             var say= message.content.substr(6);
//             bot.channels.get('229902780712615937').sendMessage(say);
//           }
//           if(message.content.startsWith("!!auto"))
//             {
//               bot.channels.get('229902780712615937').sendMessage('N\'hésite pas à follow notre channel twitch pour ne rater aucun live de nos streameurs. \n https://www.twitch.tv/dalyonetv');
//               setTimeout(() =>
//               {
//                 bot.channels.get('229902780712615937').sendMessage('N\'hésite pas à t\'abonner à notre chaîne Youtube. \n https://www.youtube.com/channel/UCeKsyUFzA8nuECmGJD-TwXw');
//               },
//               600 * 1000);
//               setTimeout(() =>
//               {
//                 bot.channels.get('229902780712615937').sendMessage('Tu peux aussi nous rejoindre sur nos différents réseaux sociaux \n Facebook : https://www.facebook.com/Dalyone-TV-700228766792574/ \n Twitter : https://twitter.com/DalyoneTV');
//               },
//               1200 * 1000);
//               function twitch()
//               {
//                 bot.channels.get('229902780712615937').sendMessage('N\'hésite pas à follow notre channel twitch pour ne rater aucun live de nos streameurs. \n https://www.twitch.tv/dalyonetv');
//               }
//                 boucleT = setInterval(twitch, 7200 * 1000)
//               function youtube()
//               {
//                 setTimeout(() =>
//                 {
//                   bot.channels.get('229902780712615937').sendMessage('N\'hésite pas à t\'abonner à notre chaîne Youtube. \n https://www.youtube.com/channel/UCeKsyUFzA8nuECmGJD-TwXw');
//                 },
//                 600 * 1000);
//               }
//                 boucleY = setInterval(youtube, 7200 * 1000)
//               function rs()
//               {
//                 setTimeout(() =>
//                 {
//                   bot.channels.get('229902780712615937').sendMessage('Tu peux aussi nous rejoindre sur nos différents réseaux sociaux \n Facebook : https://www.facebook.com/Dalyone-TV-700228766792574/ \n Twitter : https://twitter.com/DalyoneTV');
//                 },
//                 1200 * 1000);
//               }
//                 boucleRS = setInterval(rs, 7200 * 1000)
//             }  else if (message.content.startsWith("!!stopauto"))
//               {
//                 bot.channels.get('276401154626289665').sendMessage('La pub c\'est bien arrêtée.')
//                 clearInterval(boucleT)
//                 clearInterval(boucleY)
//                 clearInterval(boucleRS)
//               }
//             if (message.content.startsWith("!!pub"))
//               {
//                 function pub()
//                 {
//                   bot.channels.get('229902780712615937').sendMessage('On est actuellement en live sur : https://www.twitch.tv/dalyonetv');
//                 }
//                 boucles = setInterval(pub, 2400 * 1000)
//               }
//               else if (message.content.startsWith("!!stoppub"))
//               {
//                 clearInterval(boucles)
//                 bot.channels.get('276401154626289665').sendMessage('La pub Twitch est temporairement arrêtée.')
//               }
//             if (message.content.startsWith(prefix + "stats"))
//               {
//                 var member = bot.users.size;
//                 message.channel.sendMessage('```\nNous sommes actuellement : ' + (member) + ' sur le serveur !\n```')
//               }
//           if (message.content.startsWith(prefix + 'rejoin'))
//           {
//             let voiceChan = message.member.voiceChannel;
//             if(!voiceChan || voiceChan.type !=='voice')
//               {
//                 message.channel.sendMessage('NOP').catch(error => message.channel.sendMessage(error));
//               }
//                 else if (message.guild.voiceConnection)
//                   {
//                       message.channel.sendMessage('Je suis déja dans un channel vocal');
//                   }
//                     else
//                       {
//                         message.channel.sendMessage ('Rejoins sous peu...').then(() =>
//                           {
//                             voiceChan.join().then(() =>
//                               {
//                                 message.channel.sendMessage('j\'ai réussis à me connecté').catch(error => message.channel.sendMessage(error))
//                               }).catch(error => message.channel.sendMessage(error));
//                           }).catch(error => message.channel.sendMessage(error));
//                       }
//           }
//         if (message.content.startsWith(prefix + 'leave'))
//         {
//           let voiceChan = message.member.voiceChannel;
//           if(!voiceChan)
//             {
//               message.channel.sendMessage('Vous n\'êtes pas dans un channel vocal');
//             }
//               else
//                 {
//                   message.channel.sendMessage ('je quitte aurevoir...').then(() =>
//                     {
//                       voiceChan.leave();
//                     }).catch(error => message.channel.sendMessage(error));
//                 }
//         }
//       });
//
// //bot.on('',''=>{});
//         bot.on("message", message =>
//         {
//           if (!message.content.startsWith(prefix)) return;
//           let command = message.content.split(' ')[0].slice(prefix.length);
//           let params = message.content.split(' ').slice(1);
//           if(command === "warn")
//             {
//               let user = message.mentions.users.first();
//               let reason = params.splice(1).join(" ");
//               let modlog = bot.channels.find('name', 'moderation');
//               let warn1 = bot.guilds.get(message.guild.id).roles.find('name','warn1');
//               let warn2 = bot.guilds.get(message.guild.id).roles.find('name','warn2');
//               let warn3 = bot.guilds.get(message.guild.id).roles.find('name','warn3');
//               let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'Bandit');
//               if (!modlog) return message.reply('Je ne peux trouver le channel moderation');
//               if (!warn1) return message.reply ('je ne trouve pas le role warn1');
//               if (!warn2) return message.reply ('je ne trouve pas le role warn2');
//               if (!warn3) return message.reply ('je ne trouve pas le role warn3');
//               if (!muteRole) return message.reply('Je ne trouve pas le role Bandit');
//               if (reason.length < 1) return message.reply('Tu dois donner une raison pour avertir la personne');
//               if (message.mentions.users.size < 1) return message.reply('Tu dois mentionner la personne que tu avertis').catch(console.error);
//               if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Je n\'ai pas la permission');
//               if (message.guild.member(user).addRoles(warn1.id));
//               if (message.guild.member(user).roles.has(warn1.id))
//                 {
//                   message.guild.member(user).removeRole(warn1.id).then(() =>
//                   {
//                     message.guild.member(user).addRoles(warn2.id)
//                   });
//                 }
//               if (message.guild.member(user).roles.has(warn2.id))
//                 {
//                   message.guild.member(user).removeRole(warn1.id)
//                   message.guild.member(user).removeRole(warn2.id).then(() =>
//                   {
//                     message.guild.member(user).addRoles(warn3.id)
//                   });
//                 };
//               const embed = new Discord.RichEmbed()
//                 .setColor(0x24D5F0)
//                 .setTimestamp()
//                 .addField('Action:', 'Warning')
//                 .addField('User:', `${user.username}#${user.discriminator}`)
//                 .addField('Raison:', reason)
//                 .addField('Modérateur:', `${message.author.username}#${message.author.discriminator}`);
//               return bot.channels.get(modlog.id).sendEmbed(embed);
//             }
//               if (command === "mute")
//               {
//                 let user = message.mentions.users.first();
//                 let reason = params.splice(1).join(" ");
//                 let modlog = bot.channels.find('name', 'moderation');
//                 let warn1 = bot.guilds.get(message.guild.id).roles.find('name','warn1');
//                 let warn2 = bot.guilds.get(message.guild.id).roles.find('name','warn2');
//                 let warn3 = bot.guilds.get(message.guild.id).roles.find('name','warn3');
//                 let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'Bandit');
//                 if (!modlog) return message.reply('Je ne peux trouver le channel moderation');
//                 if (!warn1) return message.reply ('je ne trouve pas le role warn1');
//                 if (!warn2) return message.reply ('je ne trouve pas le role warn2');
//                 if (!warn3) return message.reply ('je ne trouve pas le role warn3');
//                 if (!muteRole) return message.reply('Je ne trouve pas le role Bandit');
//                 if (reason.length < 1) return message.reply('Tu dois donner une raison pour avertir la personne');
//                 if (message.mentions.users.size < 1) return message.reply('Tu dois mentionner la personne que tu avertis').catch(console.error);
//                 if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Je n\'ai pas la permission');
//                 if (message.guild.member(user).roles.has(muteRole.id))
//                 {
//                     message.guild.member(user).removeRole(muteRole.id)
//                 } else {
//                   if (message.guild.member(user).roles.has(warn3.id))
//                     {
//                       message.guild.member(user).removeRole(warn3.id).then(() =>
//                     {
//                       message.guild.member(user).addRoles(muteRole.id).then(() =>
//                       {
//                         bot.channels.get(modlog.id).sendEmbed(embed)
//                       });
//                     });
//                     } else {
//                       bot.channels.get(modlog.id).sendMessage('Attention, ' + message.author + ', a tenté de mute quelqu\'un alors qu\'il n\'a pas reçus les 3 warn');
//                     }
//                 };
//               const embed = new Discord.RichEmbed()
//               .setColor(0x24D5F0)
//               .setTimestamp()
//               .addField('Action:', 'un/Mute')
//               .addField('User:', `${user.username}#${user.discriminator}`)
//               .addField('Raison:', reason)
//               .addField('Modérateur:', `${message.author.username}#${message.author.discriminator}`);
//               }
//             if (command ==="muteauto")
//               {
//                 if(!bot.lockit) bot.lockit = [];
//                 let time = params.splice(1).join(" ");
//                 let unlock = ['release','unlock'];
//                 if (!time) return message.reply('Tu dois mettre un durée de mute en heure, minutes ou secondes');
//
//                 if(unlock.includes(time))
//                 {
//                   message.channel.overwritePermissions(message.guild.id,
//                   {
//                     SEND_MESSAGES : null
//                   }).then(() =>
//                   {
//                     message.channel.sendMessage('le channel est mute.');
//                     clearTimeout(bot.lockit[message.channel.id]);
//                     delete bot.lockit[message.channel.id];
//                   }).catch(error =>
//                       {
//                         console.log(error);
//                       });
//                 } else
//                   {
//                     message.channel.overwritePermissions(message.guild.id,
//                       {
//                         SEND_MESSAGES : false
//                       }).then(() =>
//                         {
//                           message.channel.sendMessage(`Le channel est lock pour ${ms(ms(time), {long:true})}`).then(() =>
//                           {
//                             bot.lockit[message.channel.id] = setTimeout(() =>
//                             {
//                               message.channel.overwritePermissions(message.guild.id,
//                               {
//                                 SEND_MESSAGES : null
//                               }).then(message.channel.sendMessage('Le channel est démute'))
//                               delete bot.lockit[message.channel.id];
//                             }, ms(time));
//                           })
//                         })
//                   }
//               }
//             });
