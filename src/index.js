const express = require("express");
const { WebhookClient } = require('discord.js');
const { Webhook } = require("@top-gg/sdk");
const http = require("http");
const PostHandler = require("./utils/PostHandler");
const VoteReminder = require("./utils/ReminderHandler");


module.exports = class VoteTracker {
    constructor(client, options = {}) {
        this.client = client;
        this.port = options.port || 3000;
        this.channelId = options.channelId;
        this.topggAuth = options.password;
        this.embedcolor = options.color || "#333333";
        this.guildid = options.guildId;
        this.roleid = options.roleId;
        this.app = express();
        this.server = http.createServer(this.app);
        this.webhook = options.webhook;
        this.postmode = options.postmode;
        this.reminder = options.reminder;
    }

    setupRoutes() {
        const webhook = new Webhook(this.topggAuth);

        this.app.use(express.json());

        this.app.post("/dblwebhook", webhook.listener(async (vote) => {

            const guild = await this.client.guilds.fetch(this.guildid);

            const role = guild.roles.cache.get(this.roleid);

            const webhook = new WebhookClient({ 
                url: this.webhook
            });

            const channel = guild.channels.cache.get(this.channelId);

            
            if (!guild) {
                console.error(`Invalid Guild Id: ${this.guildid}`);
                return;
            }
        
            const user = await this.client.users.fetch(vote.user);


            const postHandler = new PostHandler(
                this.client, 
                guild, 
                user, 
                role, 
                webhook, 
                channel, 
                this.postmode, 
                this.embedcolor
            );
            const reminder = new VoteReminder(
                user, 
                this.client, 
                guild,
                role,
                this.reminder,
                this.embedcolor
            )

            await postHandler.handlePost();
            await reminder.setReminder()
        }));        

        this.server.listen(this.port, () => {
            console.log(`Vote tracker listening on port ${this.port}`);
        });
    }

    init() {
        this.setupRoutes();
    }
}