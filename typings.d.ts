declare module 'your-package-name' {
    import { Client } from 'discord.js';

    export interface VoteTrackerOptions {
        port?: number;
        channelId: string;
        password: string;
        color?: string;
        guildId: string;
        roleId?: string;
        webhook: string;
        postmode: 'channel' | 'webhook';
        reminder: boolean;
    }

    export class VoteTracker {
        constructor(client: Client, options?: VoteTrackerOptions);
        init(): void;
    }
}
