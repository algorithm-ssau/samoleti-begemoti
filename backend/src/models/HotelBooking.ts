import { Schema, model } from "mongoose";
import { Booking } from "samolet-common";

const HotelBookingSchema = new Schema<Booking>(
    {
        hotelId: { type: String },
        roomId: { type: String },
        dateFrom: { type: Date },
        dateTo: { type: Date },
        status: { type: String },
    },
    {
        timestamps: true,
    }
);

export default model("HotelBooking", HotelBookingSchema);
