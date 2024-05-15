import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { HotelBooking, AuthSuccess } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /hotelBookings
// GET /hotelBookings/:id
// POST /hotelBookings
// DELETE /hotelBookings/:id
// PATCH /hotelBookings/:id

export class HotelBookingNetwork extends GenericNetwork {
    allHotelBookings() {
        return getAllHotelBookings();
    }

    hotelBookingById(id: number) {
        return getOneHotelBookingById(id);
    }

    create(hotelBooking: HotelBooking) {
        return createHotelBooking(this.axios, hotelBooking);
    }

    deleteById(id: number) {
        return deleteHotelBookingById(this.axios, id);
    }

    updateById(id: number) {
        return updateHotelBookingById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllHotelBookings() {
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
export async function getOneHotelBookingById(id: number) {
    return axios.get(`/hotelBookings/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createHotelBooking(
    axios: AxiosInstance,
    hotelBooking: HotelBooking
) {
    return axios.post<AuthSuccess>(`/hotelBookings`, hotelBooking);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteHotelBookingById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/hotelBookings/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateHotelBookingById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/hotelBookings/${id}`);
}
