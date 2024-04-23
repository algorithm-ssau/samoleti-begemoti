import { Schema, model } from "mongoose";
import { Hotel } from "../types/db_types";

const HotelSchema = new Schema<Hotel>(
    {
        name: { type: String, required: true },
        description: { type: String },
        photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        rooms: [{ type: Schema.Types.ObjectId, ref: "Room", required: true }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    },
    {
        timestamps: true,
    }
);

export default model("Hotel", HotelSchema);
