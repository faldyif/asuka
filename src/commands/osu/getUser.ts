import { DiscordCommand } from '../../contracts/discord';
import { Message, RichEmbed } from 'discord.js';
import NoMatchError from '../../errors/noMatchError';
import OsuVendors from '../../vendors/osuApi';

const osuVendors = new OsuVendors();

export default class GetUser implements DiscordCommand {
    public description: string = 'Get current osu! user';
    public name: string = 'user';

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) throw NoMatchError;
        const [userName, vendor] = args;

        const osuVendor = osuVendors.getVendor(vendor);
        const userData = await osuVendor.getUserProfile({u: userName});

        if (userData === undefined || userData.length === 0) throw NoMatchError;
        const [user] = userData;

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
        await message.reply(embed);
    }
}
