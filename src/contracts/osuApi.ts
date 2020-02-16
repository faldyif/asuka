import { OsuUser, UserProfileRequest } from "../models/osuRequest";

export interface OsuApi {
    getUserProfile(userProfileRequest: UserProfileRequest): Promise<OsuUser[]>;
}
