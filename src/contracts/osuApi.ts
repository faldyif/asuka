import { UserProfileRequest } from "../models/osuRequest";

export interface OsuApi {
    getUrl() : string;
    getUserProfile(userProfileRequest: UserProfileRequest);
}
