import Redis from "../../src/common/redis";

describe('Redis', () => {
    const redis = new Redis();

    it('Should success write, read and delete to redis', async (done) => {
        const resultWrite = await redis.set('706b16b2fb732ab6079a10fea61d078b', 'test');
        expect(resultWrite).toEqual('OK');

        const resultGet = await redis.get('706b16b2fb732ab6079a10fea61d078b');
        expect(resultGet).toEqual('test');

        const resultDelete = await redis.del('706b16b2fb732ab6079a10fea61d078b');
        expect(resultDelete).toEqual('OK');

        done();
    });
});
