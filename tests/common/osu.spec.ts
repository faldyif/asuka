import { OsuMods, stringifyOsuMods } from "../../src/common/osu";

describe('stringifyOsuMods', () => {
    it('Should success defining NM', () => {
        expect(stringifyOsuMods(OsuMods.None)).toEqual('NM');
    });

    it('Should success defining NF', () => {
        expect(stringifyOsuMods(OsuMods.NoFail)).toEqual('NF');
    });

    it('Should success defining HDHRDT', () => {
        expect(stringifyOsuMods(OsuMods.Hidden + OsuMods.HardRock + OsuMods.DoubleTime))
            .toEqual('HDHRDT');
    });

    it('Should success defining HDHRDT', () => {
        expect(stringifyOsuMods(OsuMods.Hidden + OsuMods.HardRock + OsuMods.DoubleTime))
            .toEqual('HDHRDT');
    });
});

