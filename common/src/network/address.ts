import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { Address, AuthSuccess } from "../db_types";

// GET /addresses
// GET /addresses/:id
// POST /addresses
// DELETE /addresses/:id
// PATCH /addresses/:id

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

    allAddresses() {
        return getAllAddresses();
    }

    addressById(id: number) {
        return getOneAddressById(id);
    }

    create(address: Address) {
        return createAddress(this.axios, address);
    }

    deleteById(id: number) {
        return deleteAddressById(this.axios, id);
    }

    updateById(id: number) {
        return updateAddressById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllAddresses() {
    return axios.get(`/addresses`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOneAddressById(id: number) {
    return axios.get(`/addresses/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createAddress(axios: AxiosInstance, address: Address) {
    return axios.post<AuthSuccess>(`/addresses`, address);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteAddressById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/addresses/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateAddressById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/addresses/${id}`);
}
