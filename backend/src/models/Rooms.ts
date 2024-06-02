import { Schema, model } from "mongoose";
import { Room } from "samolet-common";

const RoomSchema = new Schema<Room>(
    {
        category: { type: String },
        price: { type: Number },
        bedAmount: { type: Number },
        facilities: [{ type: Schema.Types.ObjectId, ref: "HotelFacilities" }],
        number: { type: Number },
    },
    {
        timestamps: true,
    }
);

export default model("Room", RoomSchema);
