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
     * 
     * Предварительно нужен токен
     * 
     * Possible errors:
     * 
     * status 401 - Missing Authorization Header 
     * 
     * status 404 - HotelBooking not found | User not found
     * 
     * status 422 - Signature verification failed(Это про токен)
     * 
     * status 500 - internal server error
     * 
     */
      cancelReservation = (id: string) => {
        return this.axios.post(
            `/hotelbooking/${id}/status/cancel`
        );
    }


    /**
     * 
     * Предварительно нужен токен
     * 
     * Possible errors:
     * 
     * status 400 - Insufficient funds
     * 
     * status 401 - Missing Authorization Header 
     * 
     * status 404 - HotelBooking not found | Room not found | BankAccount not found | User not found
     * 
     * status 422 - Signature verification failed(Это про токен)
     * 
     * status 500 - internal server error
     * 
     */
    payment = (id: string) => {
        return this.axios.post(
            `/hotelbooking/${id}/pay`
        );
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    getAll = () => {
        return this.axios.get<Array<THotelBooking>>(`/hotelBookings`);
    };

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    getById = (id: number) => {
        return this.axios.get<THotelBooking>(`/hotelBookings/${id}`);
    };

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create = (hotelBooking: Booking) => {
        return this.axios.post<THotelBookingWithoutId>(
        `/hotelBookings`,
        hotelBooking
        );
    };

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    deleteById = (id: number) => {
        return this.axios.delete<THotelBooking>(`/hotelBookings/${id}`);
    };

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    updateById = (id: number, newHotelBooking: Booking) => {
        return this.axios.patch<THotelBooking>(
        `/hotelBookings/${id}`,
        newHotelBooking
        );
    };
}
