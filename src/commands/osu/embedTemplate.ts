import { calculateAccuracy, calculatePP, OsuMode, stringifyOsuMods } from "../../common/osu";
import { OsuBeatmap, OsuRecent, OsuScore } from "../../models/osuRequest";
import { ApiBase }  from "../../vendors/osuAPI";
const moment = require('moment');

export class EmbedDescription {
    private static async recentScoreStructure(play: any, beatmap: OsuBeatmap, mode: OsuMode, vendor: ApiBase): Promise<string[][]> {
        return [
            [
                `▸ ${play.rank}`,
                `▸ **${await calculatePP(play, beatmap, mode, vendor)}pp**`,
                `▸ ${calculateAccuracy(play, mode)}%`,
            ],
            [
                `▸ ${play.score}`,
                `▸ x${play.maxcombo}/${beatmap.max_combo === null || beatmap.max_combo === '0' ? 'None' : beatmap.max_combo}`,
                `▸ [${play.count300}/${play.count100}/${play.count50}/${play.countmiss}]`,
            ]
        ]
    }

    private static async scoreStructure(play: any, beatmap: OsuBeatmap, mode: OsuMode, vendor: ApiBase, index: number): Promise<string[][]> {
        return [
            [
                `**${index}. \`${stringifyOsuMods(play.enabled_mods)}\` Score** [${Number(beatmap.difficultyrating).toFixed(2)}★]`
            ],
            ...await this.recentScoreStructure(play, beatmap, mode, vendor),
            [
                `▸ Score Set ${moment(play.date).fromNow()}`,
            ],
        ];
    }

    static async recentScore(play: OsuRecent, beatmap: OsuBeatmap, mode: OsuMode, vendor: ApiBase): Promise<string> {
        return (await this.recentScoreStructure(play, beatmap, mode, vendor)).map((value => (value.join(' ')))).join('\n');
    }

    static async score(plays: OsuScore[], beatmap: OsuBeatmap, mode: OsuMode, vendor: ApiBase): Promise<string> {
        const scoreStructures = await Promise.all(plays.map((play, currentIndex) => (this.scoreStructure(play, beatmap, mode, vendor, currentIndex + 1))));
        return scoreStructures.reduce((previousValue, structure) => `${previousValue}\n${structure.map((value => (value.join(' ')))).join('\n')}`, "");
    }
}
