import OsuVendors from "../../vendors/osuApi";
import { DiscordCommand } from "../../contracts/discord";
import { Collection, Message, RichEmbed } from "discord.js";

const osuVendors = new OsuVendors();

export class GetUser implements DiscordCommand {
    public description: string = 'Get current osu! user';
    public name: string = 'user';

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) return;
        const [userName, vendor] = args;

        const osuVendor = osuVendors.getVendor(vendor);
        const userData = await osuVendor.getUserProfile({u: userName});

        if (userData === undefined || userData.length === 0) return;
        const [user] = userData;

        const embed = new RichEmbed({
            author: {
                name: `${user.username}`,
                icon_url: osuVendor.getFlagImageUrl(user.country),
                url: osuVendor.getUserProfileUrl(user.user_id),
            },
            fields: [
                { name: 'Accuracy', value: Number(user.accuracy).toFixed(2) },
                { name: 'Level', value: Number(user.level).toFixed(2) },
                { name: 'Official Rank', value: `#${user.pp_rank} (${user.country}#${user.pp_country_rank})` },
                { name: 'Total PP', value: user.pp_raw },
                { name: 'Play Count', value: user.playcount },
            ],
            thumbnail: { url: osuVendor.getUserImageUrl(user.user_id) },
            footer: {
                text: `On ${osuVendor.getServerName()}`,
            },
        });
        await message.reply(embed);
    }
}

export default class OsuCommands {
    private readonly _commands: Collection<string, DiscordCommand>;

    constructor() {
        this._commands = new Collection<string, DiscordCommand>();
        this.initializeCommands();
    }

    initializeCommands() {
        const getUser = new GetUser();
        this._commands.set(getUser.name, getUser);
    }

    get commands(): Collection<string, DiscordCommand> {
        return this._commands;
    }
}
