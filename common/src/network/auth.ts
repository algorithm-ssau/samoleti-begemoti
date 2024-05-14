import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";

type Status<T extends number> = {
    status: T;
};

// POST /auth/register
// POST /auth/login

export type AuthSuccess = {
    token: string;
};

export class Network {
    private axios: AxiosInstance;
    constructor(
        private getInstance: (config: CreateAxiosDefaults) => AxiosInstance
    ) {
        this.axios = getInstance({});
    }

    setToken(token: string) {
        this.axios = this.getInstance({
            headers: {
                Authorization: token,
            },
        });
    }

    gosling() {
        return this.axios.get("/");
    }

    register(login: string, password: string) {
        return register(this.axios, login, password);
    }

    login(login_: string, password: string) {
        return login(this.axios, login_, password);
    }
}

/**
 * Possible errors:
 *
 * status 403 - user already exists
 *
 * status 500 - internal server error
 */
export async function register(
    axios: AxiosInstance,
    login: string,
    password: string
) {
    return axios.post<AuthSuccess>("/auth/register", {
        login,
        password,
    });
}

/**
 * Possible errors:
 *
 * status 401 - invalid credentials
 *
 * status 500 - internal server error
 */
export async function login(
    axios: AxiosInstance,
    login: string,
    password: string
) {
    return axios.post<AuthSuccess>("/auth/login", {
        login,
        password,
    });
}