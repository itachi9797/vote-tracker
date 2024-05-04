const { EmbedBuilder } = require('discord.js')

module.exports = class VoteReminder {
    constructor(user, client, guild, role, reminder, color) {
        this.user = user;
        this.client = client;
        this.guild = guild;
        this.role = role;
        this.reminder = reminder;
        this.color = color;
    }

    async setReminder() {
        setTimeout(async () => {
            try {
                const embed = new EmbedBuilder()
                    .setColor(this.color)
                    .setAuthor({ name: `${this.client.user.username}`, iconURL: this.client.user.displayAvatarURL() })
                    .setTitle(`Vote Reminder for ${this.client.user.username}`)
                    .setDescription(`You can vote again on top.gg by clicking [**here**](https://top.gg/bot/${this.client.user.id}/vote)`)
                    .setFooter({ text: `Thank you so much for your support!`, iconURL: this.client.user.displayAvatarURL() })
                    .setTimestamp();
                
                if (this.reminder == true) {
                    const dmChannel = await this.user.createDM();
                    await dmChannel.send({ embeds: [embed] });
                    if (this.role) {
                        try {
                            const member = await this.guild.members.fetch(this.user.id);
                            await member.roles.remove(this.role);
                        } catch (error) {
                            console.error(`Error removing role to member: ${error.message}`);
                            return;
                        }
                    } else {
                        console.error(`Invalid role Id: ${this.role.id}`);
                        return;
                    }
                } else if (this.reminder == false) {
                    if (this.role) {
                        try {
                            const member = await this.guild.members.fetch(this.user.id);
                            await member.roles.remove(this.role);
                        } catch (error) {
                            console.error(`Error removing role to member: ${error.message}`);
                            return;
                        }
                    } else {
                        console.error(`Invalid role Id: ${this.role.id}`);
                        return;
                    }
                }
            } catch (error) {
                console.error(`Error sending DM to user: ${error.message}`);
            }

        }, 12 * 60 * 60 * 1000);
    }
}
