import Redis from "./redis";

const redis = new Redis();

export async function storeLatestChannelBeatmapId (channel: any, beatmapId: any) {
    return await redis.set(`channel:${channel}:latest-beatmap-id`, beatmapId);
}
export async function getLatestChannelBeatmapId (channel: any) {
    return await redis.get(`channel:${channel}:latest-beatmap-id`);
}
