import { Schema, model } from "mongoose";
import { HotelBooking } from "../types/db_types";

const HotelBookingSchema = new Schema<HotelBooking>(
    {
        room: { type: Schema.Types.ObjectId, ref: "Room" },
        dateStart: {type: Date},
        dateEnd: {type: Date},
        status: {type: Number, default: 1}
    },
    {
        timestamps: true,
    }
);

export default model("HotelBooking", HotelBookingSchema);