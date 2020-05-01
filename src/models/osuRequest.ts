import { OsuMode, OsuMods, OsuType } from "../common/osu";

export type UserProfileRequest = {
    u: string,
    m?: OsuMode,
    type?: OsuType,
    event_days?: Number
};

export type UserRecentRequest = {
    u: string,
    m?: OsuMode,
    type?: OsuType,
    limit?: Number
};

export type GetBeatmapsRequest = {
    u?: any,
    s?: any,
    b?: any,
    a?: any,
    h?: any,
    mods?: OsuMods,
    m?: OsuMode,
    type?: OsuType,
    limit?: Number
};

export type GetScoresRequest = {
    b?: any,
    u?: any,
    m?: OsuMode,
    mods?: OsuMods,
    type?: OsuType,
    limit?: Number
};

export type OsuApiKeyParam = {
    k?: string
};

export type OsuEvent = {
    display_html: string,
    beatmap_id: string,
    beatmapset_id: string,
    date: string,
    epicfactor: string
};

export type OsuUser = {
    user_id: string,
    username: string,
    join_date: string,
    count300: string,
    count100: string,
    count50: string,
    playcount: string,
    ranked_score: string,
    total_score: string,
    pp_rank: string,
    level: string,
    pp_raw: string,
    accuracy: string,
    count_rank_ss: string,
    count_rank_ssh: string,
    count_rank_s: string,
    count_rank_sh: string,
    count_rank_a: string,
    country: string,
    total_seconds_played: string,
    pp_country_rank: string,
    events?: OsuEvent[]
};

export type OsuScore = {
    score_id: string
    score: string
    username: string
    count300: string
    count100: string
    count50: string
    countmiss: string
    maxcombo: string
    countkatu: string
    countgeki: string
    perfect: string
    enabled_mods: string
    user_id: string
    date: string
    rank: string
    pp: string
    replay_available: string
}

export type OsuRecent = {
    beatmap_id: string,
    score: string,
    maxcombo: string,
    count50: string,
    count100: string,
    count300: string,
    countmiss: string,
    countkatu: string,
    countgeki: string,
    perfect: string,
    enabled_mods: string,
    user_id: string,
    date: string,
    rank: string,
    pp?: string,
    accuracy?: string,
}

export type OsuPlay = {
    score: string,
    maxcombo: string,
    count50: string,
    count100: string,
    count300: string,
    countmiss: string,
    countkatu: string,
    countgeki: string,
    perfect: string,
    enabled_mods: string,
}

export type OsuBeatmap = {
    approved: string,
    submit_date: string,
    approved_date: string,
    last_update: string,
    artist: string,
    beatmap_id: string,
    beatmapset_id: string,
    bpm: string,
    creator: string,
    creator_id: string,
    difficultyrating: string,
    diff_aim: string,
    diff_speed: string,
    diff_size: string,
    diff_overall: string,
    diff_approach: string,
    diff_drain: string,
    hit_length: string,
    source: string,
    genre_id: string,
    language_id: string,
    title: string,
    total_length: string,
    version: string,
    file_md5: string,
    mode: string,
    tags: string,
    favourite_count: string,
    rating: string,
    playcount: string,
    passcount: string,
    count_normal: string,
    count_slider: string,
    count_spinner: string,
    max_combo: string,
    storyboard: string,
    video: string,
    download_unavailable: string,
    audio_unavailable: string,
}
