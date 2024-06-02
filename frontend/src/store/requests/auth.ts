import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    register: (data: { login: string; password: string }) =>
        network.auth.register(data.login, data.password).then(response => {
            network.setToken(response.data.token);
            return response;
        }),
    login: (data: { login: string; password: string }) =>
        network.auth.login(data.login, data.password).then(response => {
            network.setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            return response;
        }),
} satisfies NetworkDescription;

export const authThunks = fromDescription(description);
