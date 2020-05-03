import { DiscordCommand } from '../../contracts/discord';
import { Message, RichEmbed } from 'discord.js';
import NoMatchError from '../../errors/noMatchError';
import OsuVendor, { ApiBase } from '../../vendors/osuAPI';
import { OsuUser } from '../../models/osuRequest';
import { OsuMode } from "../../common/osu";

const osuVendors = new OsuVendor();

export abstract class Player implements DiscordCommand {
    abstract description: string;
    abstract name: string;
    abstract aliases: string[];

    postEmbed = async (message: Message, user: OsuUser, osuVendor: ApiBase) => {
        const embed = new RichEmbed({
            author: {
                name: `${user.username}`,
                icon_url: osuVendor.getFlagImageUrl(user.country),
                url: osuVendor.getUserProfileUrl(user.user_id),
            },
            fields: [
                { name: 'Accuracy', value: `${Number(user.accuracy).toFixed(2)}%` },
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

        await message.channel.send(embed);
    }

    abstract execute(message: Message, args: string[] | undefined): Promise<void>;
}

export class Osu extends Player {
    public description: string = 'Get current osu! user';
    public name: string = 'osu';
    public aliases: string[] = [];

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) throw new NoMatchError('Invalid arguments');
        const [userName, vendor] = args;

        const osuVendor = osuVendors.getVendor(vendor);
        const userData = await osuVendor.getUserProfile({u: userName});

        if (userData === undefined || userData.length === 0) throw new NoMatchError('User not found');
        const [user] = userData;

        await this.postEmbed(message, user, osuVendor);
    }
}

export class Mania extends Player {
    public description: string = 'Get current osu!mania user';
    public name: string = 'mania';
    public aliases: string[] = [];

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) throw new NoMatchError('Invalid arguments');
        const [userName, vendor] = args;

        const osuVendor = osuVendors.getVendor(vendor);
        const userData = await osuVendor.getUserProfile({u: userName, m: OsuMode.Mania});

        if (userData === undefined || userData.length === 0) throw new NoMatchError('User not found');
        const [user] = userData;

        await this.postEmbed(message, user, osuVendor);
    }
}

export class Taiko extends Player {
    public description: string = 'Get current osu!taiko user';
    public name: string = 'taiko';
    public aliases: string[] = [];

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) throw new NoMatchError('Invalid arguments');
        const [userName, vendor] = args;

        const osuVendor = osuVendors.getVendor(vendor);
        const userData = await osuVendor.getUserProfile({u: userName, m: OsuMode.Taiko});

        if (userData === undefined || userData.length === 0) throw new NoMatchError('User not found');
        const [user] = userData;

        await this.postEmbed(message, user, osuVendor);
    }
}

export class CTB extends Player {
    public description: string = 'Get current osu!ctb user';
    public name: string = 'ctb';
    public aliases: string[] = [];

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) throw new NoMatchError('Invalid arguments');
        const [userName, vendor] = args;

        const osuVendor = osuVendors.getVendor(vendor);
        const userData = await osuVendor.getUserProfile({u: userName, m: OsuMode.CatchTheBeat});

        if (userData === undefined || userData.length === 0) throw new NoMatchError('User not found');
        const [user] = userData;

        await this.postEmbed(message, user, osuVendor);
    }
}
