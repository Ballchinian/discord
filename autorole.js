const dotenv = require('dotenv');
dotenv.config();

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

//Auto-assign a role on join
client.on('guildMemberAdd', member => {
  const role = member.guild.roles.cache.find(r => r.name === "Baking Paper");
  if (role) {
    member.roles.add(role)
      .then(() => console.log(`Assigned ${role.name} to ${member.user.tag}`))
      .catch(console.error);
  }
});

client.login(process.env.DISCORD_TOKEN);

//---Express server for Render---
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
