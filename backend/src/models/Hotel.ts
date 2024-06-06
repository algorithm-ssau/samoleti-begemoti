import { Schema, model } from "mongoose";
import { Hotel } from "samolet-common";

const HotelSchema = new Schema<Hotel>(
    {
        name: { type: String, required: true },
        description: { type: String },
        photos: [{ type: String }],
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        rooms: [{ type: Schema.Types.ObjectId, ref: "Room", required: true }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        price: { type: Number },
    },
    {
        timestamps: true,
    }
);

export default model("Hotel", HotelSchema);
