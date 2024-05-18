import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { HotelFacilities, AuthSuccess, ModelAddition } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /hotelFacilities
// GET /hotelFacilities/:id
// POST /hotelFacilities
// DELETE /hotelFacilities/:id
// PATCH /hotelFacilities/:id

export type THotelFacility = ModelAddition & HotelFacilities;
export type THotelFacilityWithoutId = Omit<THotelFacility, "_id">;

export class HotelFacilityNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    getAll() {
        return this.axios.get<Array<THotelFacility>>(`/hotelFacilities`);
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
        return this.axios.get<THotelFacility>(`/hotelFacilities/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(hotelBooking: HotelFacilities) {
        return this.axios.post<THotelFacilityWithoutId>(
            `/hotelFacilities`,
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
        return this.axios.delete<THotelFacility>(`/hotelFacilities/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    updateById(id: number, newHotelFacilities: HotelFacilities) {
        return this.axios.patch<THotelFacility>(
            `/hotelFacilities/${id}`,
            newHotelFacilities
        );
    }
}
