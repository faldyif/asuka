import { OsuApi } from "../../contracts/osuApi";
import { apiKey } from "../../config/osu";
import Axios from "../../common/axios";
import { UserProfileRequest } from "../../models/osuRequest";

export abstract class Base implements OsuApi {
    protected axios : Axios;

    constructor() {
        this.axios = new Axios();
    }

    abstract getUrl() : string;

    async getUserProfile(userProfileRequest: UserProfileRequest) {
        try {
            const result = await this.axios.get(this.getUrl() + '/get_user', { params: userProfileRequest });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }
}
