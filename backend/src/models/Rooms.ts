import { Schema, model } from "mongoose";
import { Room } from "../types/db_types";

const RoomSchema = new Schema<Room>(
    {
        category: [{ type: Schema.Types.ObjectId, ref: "RoomCategory" }],
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
