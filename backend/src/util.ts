import axios from "axios";
import { baseURL } from "./config";

axios.defaults.baseURL = baseURL;

export const get = async (url: string) => await axios.get(url);

export function test() {
    return "да не умер он в конце драйва";
}
