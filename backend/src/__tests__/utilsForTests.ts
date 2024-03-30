import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
export const getData = async(url: string) => await axios.get(url);