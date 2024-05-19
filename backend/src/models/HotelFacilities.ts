import { Schema, model } from "mongoose";
import { HotelFacilities } from "samolet-common";

const HotelFacilitiesSchema = new Schema<HotelFacilities>(
    {
        name: { type: String },
    },
    {
        timestamps: true,
    }
);

export default model("HotelFacilities", HotelFacilitiesSchema);
