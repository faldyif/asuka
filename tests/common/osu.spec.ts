import { OsuMods, stringifyOsuMods } from "../../src/common/osu";

describe('stringifyOsuMods', () => {
    it('Should success defining NM', (done) => {
        expect(stringifyOsuMods(OsuMods.None)).toEqual('NM');
        done();
    });

    it('Should success defining NF', (done) => {
        expect(stringifyOsuMods(OsuMods.NoFail)).toEqual('NF');
        done();
    });

    it('Should success defining HDHRDT', (done) => {
        expect(stringifyOsuMods(OsuMods.Hidden + OsuMods.HardRock + OsuMods.DoubleTime))
            .toEqual('HDHRDT');
        done();
    });

    it('Should success defining HDHRDT', (done) => {
        expect(stringifyOsuMods(OsuMods.Hidden + OsuMods.HardRock + OsuMods.DoubleTime))
            .toEqual('HDHRDT');
        done();
    });
});

