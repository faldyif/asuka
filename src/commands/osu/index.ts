import { DiscordCommand } from '../../contracts/discord';
import { Collection } from 'discord.js';
import RecentScore from './recentScore';
import { CTB, Mania, Osu, Taiko } from './player';

export default class OsuCommands {
    private readonly _commands: Collection<string, DiscordCommand>;
    private _commandList: DiscordCommand[] = [
        new Osu(),
        new Mania(),
        new Taiko(),
        new CTB(),

        new RecentScore()
    ];

    constructor() {
        this._commands = new Collection<string, DiscordCommand>();
        this.initializeCommands();
    }

    initializeCommands() {
        this._commandList.forEach((discordCommand) => {
            this._commands.set(discordCommand.name, discordCommand);
            discordCommand.aliases.forEach((alias) => {
                this._commands.set(alias, discordCommand);
            });
        });
    }

    get commands(): Collection<string, DiscordCommand> {
        return this._commands;
    }
}
