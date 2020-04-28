import { OsuApi } from "../../contracts/osuApi";
import Axios from "../../common/axios";
import {
    GetBeatmapsRequest,
    OsuApiKeyParam, OsuBeatmap,
    OsuRecent,
    OsuUser,
    UserProfileRequest,
    UserRecentRequest
} from '../../models/osuRequest';
import { apiKey } from "../../config/osu";

export abstract class ApiBase implements OsuApi {
    protected axios: Axios;
    protected abstract getBaseUrl: () => string;
    protected abstract getBaseProfilePictureUrl: () => string;
    protected abstract getBaseUserProfileUrl: () => string;

    abstract getServerName: () => string;

    protected getUrl = (path: string): string => this.getBaseUrl() + path;
    protected getApiKey = (): OsuApiKeyParam => ({});

    constructor() {
        this.axios = new Axios();
    }

    async getUserProfile(request: UserProfileRequest): Promise<OsuUser[]> {
        const result = await this.axios.get(this.getUrl('/get_user'), { params: { ...request, ...this.getApiKey() } });
        return result.data;
    }
    async getUserRecent(request: UserRecentRequest): Promise<OsuRecent[]> {
        const result = await this.axios.get(this.getUrl('/get_user_recent'), { params: { ...request, ...this.getApiKey() } });
        return result.data;
    }
    async getBeatmaps(request: GetBeatmapsRequest): Promise<OsuBeatmap[]> {
        const result = await this.axios.get(this.getUrl('/get_beatmaps'), { params: { ...request, ...this.getApiKey() } });
        return result.data;
    }

    getUserProfileUrl = (userId: string) => `${this.getBaseUserProfileUrl()}/${userId}`;
    getUserImageUrl = (userId: string) => `${this.getBaseProfilePictureUrl()}/${userId}`;
    getBeatmapImageUrl = (beatmapSetId: string) => `https://assets.ppy.sh/beatmaps/${beatmapSetId}/covers/cover.jpg`;
    getFlagImageUrl = (countryCode: string) => `https://www.countryflags.io/${countryCode}/flat/64.png`;
}

export class Akatsuki extends ApiBase {
    getBaseProfilePictureUrl = (): string => "http://a.akatsuki.pw";
    getBaseUrl = (): string => "https://akatsuki.pw/api";
    getBaseUserProfileUrl = (): string => "https://akatsuki.pw/u";
    getServerName = (): string => "Akatsuki Private Server";
}
export class Ripple extends ApiBase {
    getBaseProfilePictureUrl = (): string => "http://a.ripple.moe";
    getBaseUrl = (): string => "https://ripple.moe/api";
    getBaseUserProfileUrl = (): string => "https://ripple.moe/u";
    getServerName = (): string => "Ripple Private Server";
}
export class Peppy extends ApiBase {
    getBaseUrl = (): string => "https://osu.ppy.sh/api";
    getApiKey = (): OsuApiKeyParam => ({k: apiKey});
    getBaseProfilePictureUrl = (): string => "http://s.ppy.sh/a";
    getBaseUserProfileUrl = (): string => "https://osu.ppy.sh/users";
    getServerName = (): string => "osu! Official Server";
}
export class Datenshi extends ApiBase {
    getBaseProfilePictureUrl = (): string => "http://a.datenshi.xyz";
    getBaseUrl = (): string => "https://datenshi.xyz/api";
    getBaseUserProfileUrl = (): string => "https://datenshi.xyz/u";
    getServerName = (): string => "Datenshi Private Server";
}

export default class OsuVendors {
    private readonly _peppy: ApiBase;
    private readonly _akatsuki: ApiBase;
    private readonly _ripple: ApiBase;
    private readonly _datenshi: ApiBase;

    constructor() {
        this._peppy = new Peppy();
        this._akatsuki = new Akatsuki();
        this._ripple = new Ripple();
        this._datenshi = new Datenshi();
    }

    getVendor(vendor: string) : ApiBase {
        if (vendor === 'akatsuki') {
            return this.akatsuki;
        } else if (vendor === 'ripple') {
            return this.ripple;
        } else if (vendor === 'datenshi') {
            return this.datenshi;
        }

        return this.peppy;
    }

    get peppy(): ApiBase {
        return this._peppy;
    }

    get akatsuki(): ApiBase {
        return this._akatsuki;
    }

    get ripple(): ApiBase {
        return this._ripple;
    }

    get datenshi(): ApiBase {
        return this._datenshi;
    }
}
