import { DiscordCommand } from '../../contracts/discord';
import { Message, RichEmbed } from 'discord.js';
import NoMatchError from '../../errors/noMatchError';
import OsuVendors from '../../vendors/osuApi';
import { calculateAccuracy, calculatePP, OsuMode, OsuType, stringifyOsuMods } from '../../common/osu';
const moment = require('moment');

const osuVendors = new OsuVendors();

export default class RecentScore implements DiscordCommand {
    public description: string = 'Get recent osu! play';
    public name: string = 'recent';
    public aliases: string[] = ['rs'];

    execute = async (message: Message, args?: string[]) => {
        if (args === undefined || args.length === 0) throw new NoMatchError('Invalid arguments');
        const [userName, vendor] = args;

        const mode = OsuMode.Standard;
        const osuVendor = osuVendors.getVendor(vendor);
        const userRecent = await osuVendor.getUserRecent({u: userName, type: OsuType.userName, m: mode});

        if (userRecent === undefined || userRecent.length === 0) throw new NoMatchError('User recent not found');
        const [mostRecentPlay] = userRecent;

        const beatmaps = await osuVendor.getBeatmaps({b: mostRecentPlay.beatmap_id});
        if (beatmaps === undefined || beatmaps.length === 0) throw NoMatchError;
        const [beatmap] = beatmaps;

        const texts = [
            [
                `▸ ${mostRecentPlay.rank}`,
                `▸ ${calculatePP(mostRecentPlay)}pp`,
                `▸ ${calculateAccuracy(mostRecentPlay, mode)}%`,
            ],
            [
                `▸ ${mostRecentPlay.score}`,
                `▸ x${mostRecentPlay.maxcombo}/${beatmap.max_combo}`,
                `▸ [${mostRecentPlay.count300}/${mostRecentPlay.count100}/${mostRecentPlay.count50}/${mostRecentPlay.countmiss}]`,
            ]
        ]

        const embed = new RichEmbed({
            author: {
                name: `${beatmap.title} [${beatmap.version}] +${stringifyOsuMods(Number(mostRecentPlay.enabled_mods))} [${Number(beatmap.difficultyrating).toFixed(2)}★]`,
                icon_url: osuVendor.getUserImageUrl(mostRecentPlay.user_id),
                url: osuVendor.getUserProfileUrl(mostRecentPlay.user_id),
            },
            description: texts.map((value => (value.join(' ')))).join('\n'),
            thumbnail: { url: osuVendor.getBeatmapImageUrl(beatmap.beatmapset_id) },
            footer: {
                text: `${moment(mostRecentPlay.date).fromNow()} On ${osuVendor.getServerName()}`,
            },
        });
        await message.reply(embed);
    }
}
