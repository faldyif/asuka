import { DiscordCommand } from '../../contracts/discord';
import { Collection } from 'discord.js';
import GetUser from './getUser';
import RecentScore from './recentScore';

export default class OsuCommands {
    private readonly _commands: Collection<string, DiscordCommand>;
    private _commandList: DiscordCommand[] = [
        new GetUser(),
        new RecentScore()
    ];

    constructor() {
        this._commands = new Collection<string, DiscordCommand>();
        this.initializeCommands();
    }

    initializeCommands() {
        this._commandList.forEach((discordCommand) => {
            this._commands.set(discordCommand.name, discordCommand);
        });
    }

    get commands(): Collection<string, DiscordCommand> {
        return this._commands;
    }
}
