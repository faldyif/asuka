import { OsuPlay } from "../../models/osuRequest";

import osu, { parser } from "ojsama";
import { roundTwoDigitPrecision } from "../../common/utils";
import Calculator from "./index";
import { calculateAccuracy} from "../../common/osu";

export default class StdCalculator extends Calculator {
    calculate = async (beatmapId: number, score?: OsuPlay): Promise<number> => {
        const ojsamaParser = new parser();
        ojsamaParser.feed(await this.getMap(beatmapId));

        const params = {
            map: ojsamaParser.map,
            mods: score ? Number(score.enabled_mods) : undefined,
            n300: score ? Number(score.count300) : undefined,
            n100: score ? Number(score.count100) : undefined,
            n50: score ? Number(score.count50) : undefined,
            nmiss: score ? Number(score.countmiss) : undefined,
            combo: score ? Number(score.maxcombo) : undefined,
            acc_percent: score ? calculateAccuracy(score, 0) : undefined,
        };
        const result = osu.ppv2(params);
        return roundTwoDigitPrecision(result.total);
    }
}
