const { Client, GatewayIntentBits } = require('discord.js');
const VoteTracker = require('vote-tracker');

// Create a Discord.js client
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
})

// Initialize VoteTracker with client instance and options
const voteTracker = new VoteTracker(client, {
    guildId: 'YOUR_GUILD_ID',
    roleId: 'YOUR_ROLE_ID', // Optional: specify role id
    channelId: 'YOUR_VOTE_LOG_CHANNEL_ID',
    webhook: 'YOUR_WEBHOOK_URL',
    postmode: 'channel', // Which post mode do you want? This means how you want to post your logs, using embed or webhook. Its default value is channel.
    password: 'YOUR_TOPGG_AUTH_TOKEN',
    color: '#333333', // Optional, specify embed color
    port: '3000', // Optional, specify port number
    reminder: true, // Do you want to enable reminders? This means if you want to remind a user to vote again after 12 hours, set it to true. Otherwise, set it to false. Its default value is true.
});

client.on('ready', () => {
    console.log(`${client.user.username} is now online`);
    voteTracker.init()
});

client.login('YOUR_DISCORD_BOT_TOKEN');