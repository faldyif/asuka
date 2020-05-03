import { OsuPlay } from "../../models/osuRequest";
import Axios from "../../common/axios";
import Storage, { FileType } from "../../common/storage";

export default abstract class Calculator {
    private axios: Axios;

    constructor() {
        this.axios = new Axios();
    }

    abstract async calculate(beatmapId: any, score?: OsuPlay): Promise<number>;

    getMap = async (beatmapId: any): Promise<string> => {
        if (Storage.isExists(`${beatmapId}.osu`, FileType.Beatmap)) {
            return this.getMapFromStorage(beatmapId);
        }

        const map = await this.downloadMap(beatmapId);
        this.cacheMapToStorage(beatmapId, map);

        return map;
    }
    cacheMapToStorage = (beatmapId: any, data: string): void => (Storage.write(`${beatmapId}.osu`, FileType.Beatmap, data));
    getMapFromStorage = (beatmapId: any): string => (Storage.read(`${beatmapId}.osu`, FileType.Beatmap));
    downloadMap = async (beatmapId: any): Promise<string> => ((await this.axios.get(`https://osu.ppy.sh/osu/${beatmapId}`)).data);
}
