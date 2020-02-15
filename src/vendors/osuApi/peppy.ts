import { Base } from "./base";

export class Peppy extends Base {
    getUrl(): string {
        return "https://osu.ppy.sh/api";
    }
}
