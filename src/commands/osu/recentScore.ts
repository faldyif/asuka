import { DiscordCommand } from '../../contracts/discord';
import { Message, RichEmbed } from 'discord.js';
import NoMatchError from '../../errors/noMatchError';
import OsuVendors from '../../vendors/osuApi';
import { calculateAccuracy, calculatePP, OsuMode, OsuType, stringifyOsuMods, stringModeToEnum } from '../../common/osu';
import { storeLatestChannelBeatmapId } from "../../common/cache";
import { EmbedDescription } from "./embedTemplate";
const moment = require('moment');

const osuVendors = new OsuVendors();

export default class RecentScore implements DiscordCommand {
    public description: string = 'Get recent osu! play';
    public name: string = 'recent';
    public aliases: string[] = ['rs'];

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) throw new NoMatchError('Invalid arguments');
        const [userName, vendor, modeArg] = args;

        const mode = stringModeToEnum(modeArg);
        const osuVendor = osuVendors.getVendor(vendor);

        const userRecent = await osuVendor.getUserRecent({u: userName, type: OsuType.userName, m: mode});
        if (userRecent === undefined || userRecent.length === 0) throw new NoMatchError('User recent not found');
        const [mostRecentPlay] = userRecent;

        const beatmaps = await osuVendor.getBeatmaps({b: mostRecentPlay.beatmap_id});
        if (beatmaps === undefined || beatmaps.length === 0) throw NoMatchError;
        const [beatmap] = beatmaps;

        const embed = new RichEmbed({
            author: {
                name: `${beatmap.title} [${beatmap.version}] +${stringifyOsuMods(mostRecentPlay.enabled_mods)} [${Number(beatmap.difficultyrating).toFixed(2)}★]`,
                icon_url: osuVendor.getUserImageUrl(mostRecentPlay.user_id),
                url: osuVendor.getUserProfileUrl(mostRecentPlay.user_id),
            },
            description: EmbedDescription.recentScore(mostRecentPlay, beatmap, mode),
            thumbnail: { url: osuVendor.getBeatmapImageUrl(beatmap.beatmapset_id) },
            footer: {
                text: `${moment(mostRecentPlay.date).fromNow()} On ${osuVendor.getServerName()}`,
            },
        });
        await message.channel.send(embed);

        await storeLatestChannelBeatmapId(message.channel.id, beatmap.beatmap_id);
    }
}
