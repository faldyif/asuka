import { Akatsuki } from "../../../src/vendors/osuApi";

describe('Akatsuki', () => {
    const akatsuki: Akatsuki = new Akatsuki();

    describe('getUserImageUrl', () => {
        it('Should success getting user image URL', () => {
            expect(akatsuki.getUserImageUrl(123)).toEqual('http://a.akatsuki.pw/123');
        });
    });
});

