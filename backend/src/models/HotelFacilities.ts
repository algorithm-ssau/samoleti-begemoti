import { Schema, model } from "mongoose";
import { HotelFacilities } from "../types/db_types";

const HotelFacilitiesSchema = new Schema<HotelFacilities>(
    {
        name: { type: String },
    },
    {
        timestamps: true,
    }
);

export default model("HotelFacilities", HotelFacilitiesSchema);
