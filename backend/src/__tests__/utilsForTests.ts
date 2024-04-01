import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const getData = async (url: string) =>
    await axios
        .get(url)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
