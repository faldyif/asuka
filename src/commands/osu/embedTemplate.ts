import { calculateAccuracy, calculatePP, OsuMode, stringifyOsuMods } from "../../common/osu";
import { OsuBeatmap, OsuRecent, OsuScore } from "../../models/osuRequest";
const moment = require('moment');

export class EmbedDescription {
    private static recentScoreStructure(play: any, beatmap: OsuBeatmap, mode: OsuMode): string[][] {
        return [
            [
                `▸ ${play.rank}`,
                `▸ **${calculatePP(play)}pp**`,
                `▸ ${calculateAccuracy(play, mode)}%`,
            ],
            [
                `▸ ${play.score}`,
                `▸ x${play.maxcombo}/${beatmap.max_combo || 'None'}`,
                `▸ [${play.count300}/${play.count100}/${play.count50}/${play.countmiss}]`,
            ]
        ]
    }

    private static scoreStructure(play: any, beatmap: OsuBeatmap, mode: OsuMode, index: number): string[][] {
        return [
            [
                `**${index}. \`${stringifyOsuMods(play.enabled_mods)}\` Score** [${Number(beatmap.difficultyrating).toFixed(2)}★]`
            ],
            ...this.recentScoreStructure(play, beatmap, mode),
            [
                `▸ Score Set ${moment(play.date).fromNow()}`,
            ],
        ];
    }

    static recentScore(play: OsuRecent, beatmap: OsuBeatmap, mode: OsuMode): string {
        return this.recentScoreStructure(play, beatmap, mode).map((value => (value.join(' ')))).join('\n');
    }

    static score(plays: OsuScore[], beatmap: OsuBeatmap, mode: OsuMode): string {
        return plays.reduce((previousValue, play, currentIndex) => (
            `${previousValue}\n${this.scoreStructure(play, beatmap, mode, currentIndex + 1).map((value => (value.join(' ')))).join('\n')}`
        ), "");
    }
}
