import { Schema, model } from "mongoose";
import { RoomCategory } from "samolet-common/db_types";

const RoomCategorySchema = new Schema<RoomCategory>(
    {
        name: { type: String },
    },
    {
        timestamps: true,
    }
);

export default model("RoomCategory", RoomCategorySchema);
