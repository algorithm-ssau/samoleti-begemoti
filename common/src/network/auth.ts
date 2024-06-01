import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { GenericNetwork } from "./genericNetwork";

type Status<T extends number> = {
  status: T;
};

// POST /auth/register
// POST /auth/login

export type UserCredentials = {
  email: string;
  password: string;
};

export type AuthSuccess = {
  token: string;
};

export class AuthNetwork extends GenericNetwork {
  /**
   * Possible errors:
   *
   * status 403 - user already exists
   *
   * status 500 - internal server error
   */
  register(login: string, password: string) {
    return this.axios.post<AuthSuccess>("/auth/register", {
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
  login(login_: string, password: string) {
    return this.axios.post<AuthSuccess>("/auth/login", {
      login: login_,
      password,
    });
  }

  sum(array: number[]) {}
}
