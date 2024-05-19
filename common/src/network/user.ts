import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess, ModelAddition } from "../db_types";
import { User } from "../user_type";
import { Network } from ".";
import { GenericNetwork } from "./genericNetwork";

// GET /users
// GET /users/:id
// POST /users
// DELETE /users/:id
// PATCH /users/:id

export type TUser = ModelAddition & User;
export type TUserWithoutId = Omit<TUser, "_id">;

export class UserNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    getAll() {
        return this.axios.get<Array<TUser>>(`/users`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    getById(id: number) {
        return this.axios.get<TUser>(`/users/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(hotelBooking: User) {
        return this.axios.post<TUserWithoutId>(
            `/users`,
            hotelBooking
        );
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    deleteById(id: number) {
        return this.axios.delete<TUser>(`/users/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    updateById(id: number, newUser: User) {
        return this.axios.patch<TUser>(`/users/${id}`, newUser);
    }
}