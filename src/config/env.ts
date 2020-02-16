import { config } from "dotenv";
import { resolve } from "path";

const test = resolve(__dirname, "../../.env");
export const env = () => {
    config({ path: resolve(__dirname, "../../.env") });
};
