const dotenv = require('dotenv');
dotenv.config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Example: auto-assign a role on join
client.on('guildMemberAdd', member => {
  const role = member.guild.roles.cache.find(r => r.name === "Baking Paper");
  if (role) {
    member.roles.add(role)
      .then(() => console.log(`Assigned ${role.name} to ${member.user.tag}`))
      .catch(console.error);
  }
});

client.login(process.env.DISCORD_TOKEN);