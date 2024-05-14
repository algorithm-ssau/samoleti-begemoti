import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { Hotel, AuthSuccess } from "../db_types";

// GET /search/hotel?place=...
// GET /hotels
// GET /hotels/:id
// POST /hotels
// DELETE /hotels/:id
// PATCH /hotels/:id

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

    hotelByPlace(place: string) {
        return getHotelByPlace(place);
    }

    allHotels() {
        return getAllHotels();
    }

    hotelById(id: number) {
        return getOneHotelById(id);
    }

    create(hotel: Hotel) {
        return createHotel(this.axios, hotel);
    }

    deleteById(id: number) {
        return deleteHotelById(this.axios, id);
    }

    updateById(id: number) {
        return updateHotelById(this.axios, id);
    }
}

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
export async function getHotelByPlace(place: string) {
    return axios.get(`/search/hotel?place=${place}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllHotels() {
    return axios.get(`/hotels`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOneHotelById(id: number) {
    return axios.get(`/hotels/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createHotel(axios: AxiosInstance, hotel: Hotel) {
    return axios.post<AuthSuccess>(`/hotels`, hotel);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteHotelById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/hotels/${id}`);
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
