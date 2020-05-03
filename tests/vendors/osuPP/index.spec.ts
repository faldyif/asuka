import Calculator from "../../../src/vendors/osuPP";
import { OsuPlay } from "../../../src/models/osuRequest";
import Std from "../../../src/vendors/osuPP/std";

describe('Std', () => {
    const stdCalculator: Calculator = new Std();
    const beatmapId = 657054;

    describe('downloadMap', () => {
        it('Should success getting map from URL', async (done) => {
            const result = await stdCalculator.downloadMap(beatmapId);
            expect(result.startsWith('osu file format')).toEqual(true);
            done();
        });
    });

    describe('getMap', () => {
        it('Should success downloading and caching map to storage', async (done) => {
            const result = await stdCalculator.getMap(beatmapId);
            expect(stdCalculator.getMapFromStorage(beatmapId)).toEqual(result);
            done();
        });
    });

    describe('calculate', () => {
        const osuScore: OsuPlay = {
            count100: "14",
            count300: "1187",
            count50: "0",
            countgeki: "152",
            countkatu: "9",
            countmiss: "1",
            maxcombo: "1304",
            perfect: "0",
            score: "28755050",
            enabled_mods: "0"
        };

        it('Should success calculating PP', async (done) => {
            const result = await stdCalculator.calculate(beatmapId, osuScore);
            expect(result).toBeGreaterThan(150);
            done();
        });
    });
});

