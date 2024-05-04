const { EmbedBuilder } = require("discord.js");


module.exports = class PostHandler {
    constructor(client, guild, user, role, webhook, channel, postmode, embedcolor) {
        this.client = client;
        this.guild = guild;
        this.user = user;
        this.role = role;
        this.webhook = webhook;
        this.channel = channel;
        this.postmode = postmode;
        this.embedcolor = embedcolor;
    }

    async handlePost() {
        const embed = new EmbedBuilder()
            .setColor(this.embedcolor)
            .setAuthor({ name: `${this.client.user.username}!`, iconURL: this.client.user.displayAvatarURL({ size: 4096 }) })
            .setDescription(`User: **${this.user.username}** \`(${this.user.id})\` just voted!\n\nYou can vote on top.gg [**here**](https://top.gg/bot/${this.client.user.id}/vote) every 12 hours!`)
            .setFooter({ text: `Thank you so much for your support!`, iconURL: this.client.user.displayAvatarURL({ size: 4096 }) })
            .setTimestamp();

        if (this.postmode === "channel") {
            if (this.channel) {
                await this.channel.send({ embeds: [embed] });

            } else {
                console.error(`Invalid vote log channel: ${this.channel.id}`);
                return;
            }
        } else if (this.postmode === "webhook") {
            if (this.webhook) {
                await this.webhook.edit({ name: `${this.user.username} | Vote-Tracker`, avatar: this.user.displayAvatarURL() });
                await this.webhook.send({ embeds: [embed] });
            } else {
                console.error(`Invalid webhook Url: ${this.webhook}`);
                return;
            }
        } else {
            console.log('Please provide a valid post mode.');
        }

        if (this.role) {
            try {
                const member = await this.guild.members.fetch(this.user.id);
                await member.roles.add(this.role);
            } catch (error) {
                console.error(`Error adding role to member: ${error.message}`);
                return;
            }
        } else {
            console.error(`Invalid role Id: ${this.role.id}`);
            return;
        }
    }
}