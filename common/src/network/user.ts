import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess } from "../db_types";
import { User } from "../user_type";
import { Network } from ".";
import { GenericNetwork } from "./genericNetwork";

// GET /users
// GET /users/:id
// POST /users
// DELETE /users/:id
// PATCH /users/:id

export class UserNetwork extends GenericNetwork {
    allUsers() {
        return getAllUsers();
    }

    UserById(id: number) {
        return getOneUserById(id);
    }

    create(user: User) {
        return createUser(this.axios, user);
    }

    deleteById(id: number) {
        return deleteUserById(this.axios, id);
    }

    updateById(id: number) {
        return updateUserById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllUsers() {
    return axios.get(`/users`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOneUserById(id: number) {
    return axios.get(`/users/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createUser(axios: AxiosInstance, user: User) {
    return axios.post<AuthSuccess>(`/users`, user);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteUserById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/users/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateUserById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/users/${id}`);
}
