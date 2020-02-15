import { apiKey } from "../config/osu";
import AxiosError from "../errors/axiosError";

const axios = require('axios').default;

export default class Axios {
    async get(url: string, config: any) {
        try {
            return await axios.get(url, config);
        } catch (e) {
            throw <AxiosError> e;
        }
    }

    async post(url: string, config: any) {
        try {
            return await axios.get(url, config);
        } catch (e) {
            throw <AxiosError> e;
        }
    }

    handleAxiosError(error: AxiosError) {
        console.log(error);
    }
}
