import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess, Room } from "../db_types";

// GET /rooms
// GET /rooms/:id
// POST /rooms
// DELETE /rooms/:id
// PATCH /rooms/:id

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

    allRooms() {
        return getAllRooms();
    }

    roomById(id: number) {
        return getOneRoomById(id);
    }

    create(room: Room) {
        return createRoom(this.axios, room);
    }

    deleteById(id: number) {
        return deleteRoomById(this.axios, id);
    }

    updateById(id: number) {
        return updateRoomById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllRooms() {
    return axios.get(`/rooms`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOneRoomById(id: number) {
    return axios.get(`/rooms/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createRoom(axios: AxiosInstance, room: Room) {
    return axios.post<AuthSuccess>(`/rooms`, room);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteRoomById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/rooms/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateRoomById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/rooms/${id}`);
}
