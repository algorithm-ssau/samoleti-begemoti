import { Booking, ModelAddition } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /hotelBookings
// GET /hotelBookings/:id
// POST /hotelBookings
// DELETE /hotelBookings/:id
// PATCH /hotelBookings/:id

export type THotelBooking = ModelAddition & Booking;
export type THotelBookingWithoutId = Omit<THotelBooking, "_id">;

export class HotelBookingNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    getAll() {
        return this.axios.get<Array<THotelBooking>>(`/hotelBookings`);
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
        return this.axios.get<THotelBooking>(`/hotelBookings/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(hotelBooking: Booking) {
        return this.axios.post<THotelBookingWithoutId>(
            `/hotelBookings`,
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
        return this.axios.delete<THotelBooking>(`/hotelBookings/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    updateById(id: number, newHotelBooking: Booking) {
        return this.axios.patch<THotelBooking>(
            `/hotelBookings/${id}`,
            newHotelBooking
        );
    }
}
