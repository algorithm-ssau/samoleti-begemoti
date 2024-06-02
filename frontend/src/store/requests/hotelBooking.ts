import type { Booking } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createbooking: network.hotelBooking.create,
    bookingById: network.hotelBooking.getById,
    getAllBookings: network.hotelBooking.getAll,
    deleteBookingById: network.hotelBooking.deleteById,
    updateBookingById: (data: { id: number; newBooking: Booking }) =>
        network.hotelBooking.updateById(data.id, data.newBooking),
} satisfies NetworkDescription;

export const hotelBookingThunks = fromDescription(description);
