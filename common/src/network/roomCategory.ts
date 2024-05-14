import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess, RoomCategory } from "../db_types";

// GET /roomCategories
// GET /roomCategories/:id
// POST /roomCategories
// DELETE /roomCategories/:id
// PATCH /roomCategories/:id

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

    allRoomCategories() {
        return getAllRoomsCategories();
    }

    roomCategoryById(id: number) {
        return getOneRoomCategoryById(id);
    }

    create(roomCategory: RoomCategory) {
        return createRoomCategory(this.axios, roomCategory);
    }

    deleteById(id: number) {
        return deleteRoomCategoryById(this.axios, id);
    }

    updateById(id: number) {
        return updateRoomCategoryById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllRoomsCategories() {
    return axios.get(`/roomCategories`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOneRoomCategoryById(id: number) {
    return axios.get(`/roomCategories/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createRoomCategory(axios: AxiosInstance, roomCategory: RoomCategory) {
    return axios.post<AuthSuccess>(`/roomCategories`, roomCategory);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteRoomCategoryById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/roomCategories/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateRoomCategoryById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/roomCategories/${id}`);
}
