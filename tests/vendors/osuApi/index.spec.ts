import { Akatsuki } from "../../../src/vendors/osuAPI";

describe('Akatsuki', () => {
    const akatsuki: Akatsuki = new Akatsuki();

    describe('getUserImageUrl', () => {
        it('Should success getting user image URL', (done) => {
            expect(akatsuki.getUserImageUrl(123)).toEqual('http://a.akatsuki.pw/123');
            done();
        });
    });
});

