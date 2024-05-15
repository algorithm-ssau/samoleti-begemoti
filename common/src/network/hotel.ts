import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { Hotel, AuthSuccess } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /search/hotel?place=...
// GET /hotels
// GET /hotels/:id
// POST /hotels
// DELETE /hotels/:id
// PATCH /hotels/:id

export class HotelNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 400 - where place? invalid request
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    byPlace(place: string) {
        return this.axios.get(`/search/hotel?place=${place}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    all() {
        return this.axios.get(`/hotels`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    byId(id: number) {
        return this.axios.get(`/hotels/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(hotel: Hotel) {
        return this.axios.post<AuthSuccess>(`/hotels`, hotel);
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
        return this.axios.delete<AuthSuccess>(`/hotels/${id}`);
    }
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateHotelById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/hotels/${id}`);
}
