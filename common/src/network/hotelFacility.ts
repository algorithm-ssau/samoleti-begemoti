import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { HotelFacilities, AuthSuccess } from "../db_types";

// GET /hotelFacilities
// GET /hotelFacilities/:id
// POST /hotelFacilities
// DELETE /hotelFacilities/:id
// PATCH /hotelFacilities/:id

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

    allHotelFacilities() {
        return getAllHotelFacilities();
    }

    hotelFacilityById(id: number) {
        return getOneHotelFacilityById(id);
    }

    create(hotelFacility: HotelFacilities) {
        return createHotelFacility(this.axios, hotelFacility);
    }

    deleteById(id: number) {
        return deleteHotelFacilityById(this.axios, id);
    }

    updateById(id: number) {
        return updateHotelFacilityById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllHotelFacilities() {
    return axios.get(`/hotelBookings`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOneHotelFacilityById(id: number) {
    return axios.get(`/hotelFacilities/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createHotelFacility(axios: AxiosInstance, hotelFacility: HotelFacilities) {
    return axios.post<AuthSuccess>(`/hotelFacilities`, hotelFacility);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteHotelFacilityById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/hotelFacilities/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateHotelFacilityById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/hotelFacilities/${id}`);
}
