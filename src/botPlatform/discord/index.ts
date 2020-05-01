import { Client, Message, Collection } from "discord.js";
import { token, prefix } from "../../config/discord";
import DiscordError from "../../errors/discord";
import { DiscordCommand } from "../../contracts/discord";
import OsuCommands from "../../commands/osu";
import NoMatchError from "../../errors/noMatchError";

export class Discord {
    private client: Client;
    private commands: Collection<string, DiscordCommand>;

    private readonly osuCommands: Collection<string, DiscordCommand>;

    constructor() {
        this.client = new Client();
        this.commands = new Collection<string, DiscordCommand>();
        this.osuCommands = new Collection<string, DiscordCommand>(new OsuCommands().commands);
    }

    async initializeClient() {
        await this.initializeCommands();
        await this.attachListeners();
        await this.client.login(token);
    }

    async attachListeners() {
        this.client.on('ready', this.handleReady);
        this.client.on('message', this.handleMessage);
    }

    handleReady = () => {
        console.log(`Logged in as ${this.client.user.tag}!`);
    };
    parseMessage = (message: Message) => {
        const args = message.content.slice(prefix.length).split(/ +/);
        const shiftedArgs = args.shift();
        if (typeof shiftedArgs !== "string") throw DiscordError;
        const command = shiftedArgs.toLowerCase();
        return { args, command };
    };

    async initializeCommands() {
        this.commands = this.commands.concat(this.osuCommands);
    }

    isValidMessage = (message: Message): boolean => (message.content.startsWith(prefix) && !message.author.bot);
    handleMessage = async (message: Message) => {
        if (!this.isValidMessage(message)) return;
        try {
            const { args, command } = this.parseMessage(message);
            if (!this.commands.has(command)) return;

            const discordCommand = this.commands.get(command);
            if (discordCommand === undefined) return;

            await discordCommand.execute(message, args);
        } catch (error) {
            if (error instanceof NoMatchError) {
                await message.channel.send(`\`${error.message}\``);
            } else {
                console.error(error);
                await message.channel.send('Unknown error');
            }
        }
    }

}
