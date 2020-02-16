import { OsuApi } from "../../contracts/osuApi";
import Axios from "../../common/axios";
import { OsuApiKeyParam, OsuUser, UserProfileRequest } from "../../models/osuRequest";
import { apiKey } from "../../config/osu";

export abstract class Base implements OsuApi {
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

    async getUserProfile(userProfileRequest: UserProfileRequest): Promise<OsuUser[]> {
        const result = await this.axios.get(this.getUrl('/get_user'), { params: { ...userProfileRequest, ...this.getApiKey() } });
        return result.data;
    }
    getUserProfileUrl = (userId: string) => `${this.getBaseUserProfileUrl()}/${userId}`;
    getUserImageUrl = (userId: string) => `${this.getBaseProfilePictureUrl()}/${userId}`;
    getFlagImageUrl = (countryCode: string) => `https://www.countryflags.io/${countryCode}/flat/64.png`;
}

export class Akatsuki extends Base {
    getBaseProfilePictureUrl = (): string => "http://a.akatsuki.pw";
    getBaseUrl = (): string => "https://akatsuki.pw/api";
    getBaseUserProfileUrl = (): string => "https://akatsuki.pw/u";
    getServerName = (): string => "Akatsuki Private Server";
}
export class Ripple extends Base {
    getBaseProfilePictureUrl = (): string => "http://a.ripple.moe";
    getBaseUrl = (): string => "https://ripple.moe/api";
    getBaseUserProfileUrl = (): string => "https://ripple.moe/u";
    getServerName = (): string => "Ripple Private Server";
}
export class Peppy extends Base {
    getBaseUrl = (): string => "https://osu.ppy.sh/api";
    getApiKey = (): OsuApiKeyParam => ({k: apiKey});
    getBaseProfilePictureUrl = (): string => "http://s.ppy.sh/a";
    getBaseUserProfileUrl = (): string => "https://osu.ppy.sh/users";
    getServerName = (): string => "osu! Official Server";
}

export default class OsuVendors {
    private readonly _peppy: Base;
    private readonly _akatsuki: Base;
    private readonly _ripple: Base;

    constructor() {
        this._peppy = new Peppy();
        this._akatsuki = new Akatsuki();
        this._ripple = new Ripple();
    }

    getVendor(vendor: string) : Base {
        if (vendor === 'akatsuki') {
            return this.akatsuki;
        } else if (vendor === 'ripple') {
            return this.ripple;
        }

        return this.peppy;
    }

    get peppy(): Base {
        return this._peppy;
    }

    get akatsuki(): Base {
        return this._akatsuki;
    }

    get ripple(): Base {
        return this._ripple;
    }
}
