import { OsuPlay } from '../models/osuRequest';

export enum OsuMode {
    Standard,
    Taiko,
    CatchTheBeat,
    Mania
}
export enum OsuType {
    userName = 'string',
    userIds = 'id',
}
export enum OsuMods
{
    None           = 0,
    NoFail         = 1,
    Easy           = 2,
    TouchDevice    = 4,
    Hidden         = 8,
    HardRock       = 16,
    SuddenDeath    = 32,
    DoubleTime     = 64,
    Relax          = 128,
    HalfTime       = 256,
    Nightcore      = 512, // Only set along with DoubleTime. i.e: NC only gives 576
    Flashlight     = 1024,
    Autoplay       = 2048,
    SpunOut        = 4096,
    Relax2         = 8192,    // Autopilot
    Perfect        = 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416
    Key4           = 32768,
    Key5           = 65536,
    Key6           = 131072,
    Key7           = 262144,
    Key8           = 524288,
    FadeIn         = 1048576,
    Random         = 2097152,
    Cinema         = 4194304,
    Target         = 8388608,
    Key9           = 16777216,
    KeyCoop        = 33554432,
    Key1           = 67108864,
    Key3           = 134217728,
    Key2           = 268435456,
    ScoreV2        = 536870912,
    Mirror         = 1073741824,
}
const applicableMods = [
    { bit: OsuMods.NoFail, short: 'NF' },
    { bit: OsuMods.Easy, short: 'EZ' },
    { bit: OsuMods.TouchDevice, short: 'TD' },
    { bit: OsuMods.Hidden, short: 'HD' },
    { bit: OsuMods.HardRock, short: 'HR' },
    { bit: OsuMods.SuddenDeath, short: 'SD' },
    { bit: OsuMods.DoubleTime, short: 'DT' },
    { bit: OsuMods.Relax, short: 'RX' },
    { bit: OsuMods.HalfTime, short: 'HT' },
    { bit: OsuMods.Nightcore, short: 'NC' },
    { bit: OsuMods.Flashlight, short: 'FL' },
    { bit: OsuMods.Autoplay, short: 'Auto' },
    { bit: OsuMods.SpunOut, short: 'SO' },
    { bit: OsuMods.Relax2, short: 'AP' },
    { bit: OsuMods.Perfect, short: 'PF' },
    { bit: OsuMods.Key4, short: '4K' },
    { bit: OsuMods.Key5, short: '5K' },
    { bit: OsuMods.Key6, short: '6K' },
    { bit: OsuMods.Key7, short: '7K' },
    { bit: OsuMods.Key8, short: '8K' },
    { bit: OsuMods.FadeIn, short: 'FI' },
    { bit: OsuMods.Random, short: 'Random' },
    { bit: OsuMods.Cinema, short: 'Cinema' },
    { bit: OsuMods.Target, short: 'Target' },
    { bit: OsuMods.Key9, short: '9K' },
    { bit: OsuMods.KeyCoop, short: 'COOP' },
    { bit: OsuMods.Key1, short: '1K' },
    { bit: OsuMods.Key3, short: '3K' },
    { bit: OsuMods.Key2, short: '2K' },
    { bit: OsuMods.ScoreV2, short: 'ScoreV2' },
    { bit: OsuMods.Mirror, short: 'MR' },
];

export function stringModeToEnum(mode: any) {
    if (mode === 'mania') {
        return OsuMode.Mania;
    } else if (mode === 'taiko') {
        return OsuMode.Taiko;
    } else if (mode === 'ctb' || mode === 'catch') {
        return OsuMode.CatchTheBeat;
    }

    return OsuMode.Standard;
}
export function enumModeToString(mode: OsuMode) {
    if (mode === OsuMode.Standard) {
        return 'osu! Standard';
    } else if (mode === OsuMode.Mania) {
        return 'osu! Mania';
    } else if (mode === OsuMode.CatchTheBeat) {
        return 'osu! Catch the Beat';
    }

    return 'osu! Taiko';
}

export function stringifyOsuMods (osuMod: any) : string {
    const mod = Number(osuMod);

    if (mod === 0) return "No Mod";

    return applicableMods.reduce(((previousValue, currentValue) => (
        mod & currentValue.bit ? `${previousValue}${currentValue.short}` : previousValue
    )), '');
}

export function calculateAccuracy (osuPlay: OsuPlay, gameMode: OsuMode, round: boolean = true) {
    const c = {
        '50': Number(osuPlay.count50),
        '100': Number(osuPlay.count100),
        '300': Number(osuPlay.count300),
        miss: Number(osuPlay.countmiss),
        geki: Number(osuPlay.countgeki),
        katu: Number(osuPlay.countkatu),
    };

    let total: number = 0;
    let accuracy: number = 0;

    if (gameMode === OsuMode.Standard) {
        total = c['50'] + c['100'] + c['300'] + c.miss;
        accuracy = total === 0 ? 0 : ((c['300'] * 300 + c['100'] * 100 + c['50'] * 50) / (total * 300));
    } else if (gameMode === OsuMode.Mania) {
        total = c['50'] + c['100'] + c['300'] + c.katu + c.geki + c.miss;
        accuracy = total === 0 ? 0 : ((c['50'] * 50 + c['100'] * 100 + c.katu * 200 + (c['300'] + c.geki) * 300) / (total * 300));
    } else if (gameMode === OsuMode.CatchTheBeat) {
        total = c['50'] + c['100'] + c['300'] + c.katu + c.miss;
        accuracy = total === 0 ? 0 : ((c['50'] + c['100'] + c['300']) / total);
    } else { // Taiko
        total = c['100'] + c['300'] + c.miss;
        accuracy = total === 0 ? 0 : (((c['300'] + c['100'] * .5) * 300) / (total * 300));
    }

    if (round) {
        return Math.round(accuracy * 10000) / 100;
    }

    return accuracy * 100;
}

export function calculatePP (osuPlay: OsuPlay) {
    // TODO: implement this
    return '?';
}
