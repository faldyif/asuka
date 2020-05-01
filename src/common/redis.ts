import { host, password, port, prefix } from "../config/redis";
import { Tedis } from "tedis";

export default class Redis {
    private readonly client: Tedis;

    constructor() {
        this.client = new Tedis({
            port,
            host,
            password: (!password || password === '') ? undefined : password,
        });
    }

    async get(key: string) {
        return await this.client.get(Redis.convertKey(key));
    }

    async set(key: string, value: string) {
        return await this.client.set(Redis.convertKey(key), value);
    }

    async del(key: string, ...keys: string[]) {
        return await this.client.del(Redis.convertKey(key), ...keys);
    }

    private static convertKey(key: string) {
        return `${prefix}:${key}`;
    }
}
