import { Message } from "discord.js";

export interface DiscordCommand {
    name: string,
    description?: string,
    execute: (message: Message, args?: string[]) => Promise<void>;
}
