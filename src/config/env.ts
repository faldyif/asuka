import { config } from "dotenv";
import { resolve } from "path";

export const env = () => {
    config({ path: resolve(__dirname, "../../.env") });
};
