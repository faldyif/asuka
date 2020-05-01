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

export function stringifyOsuMods (osuMod: number) : string {
    if (osuMod === 0) return "No Mod";

    return applicableMods.reduce(((previousValue, currentValue) => (
        osuMod & currentValue.bit ? `${previousValue}${currentValue.short}` : previousValue
    )), '');
}

export function calculateAccuracy (osuPlay: OsuPlay) {
    // TODO: implement this
    return '?';
}

export function calculatePP (osuPlay: OsuPlay) {
    // TODO: implement this
    return '?';
}
