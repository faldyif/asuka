import { OsuApi } from "../../contracts/osuApi";
import { apiKey } from "../../config/osu";
const querystring = require('querystring');

export class Peppy implements OsuApi {
    async getUserProfile() {
        try {
            const result = await axios.get(this.getUrl() + '/get_user', {
                a: {
                    u: 'Fal',
                    k: apiKey
                }
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    getUrl(): string {
        return "https://osu.ppy.sh/api";
    }

}
