import axios, { Axios, AxiosInstance } from "axios";

export class GenericNetwork {
    axios: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        this.axios = axiosInstance ?? axios.create();
    }

    setAxios(axios: AxiosInstance) {
        this.axios = axios;
    }
}
