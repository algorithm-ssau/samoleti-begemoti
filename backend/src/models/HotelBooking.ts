import { Schema, model } from "mongoose";
import { HotelBooking } from "samolet-common/db_types";

const HotelBookingSchema = new Schema<HotelBooking>(
    {
        room: [{ type: Schema.Types.ObjectId, ref: "Room" }],
        dateStart: { type: Date },
        dateEnd: { type: Date },
        status: { type: Number },
    },
    {
        timestamps: true,
    }
);

export default model("HotelBooking", HotelBookingSchema);
