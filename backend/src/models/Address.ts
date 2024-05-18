import { Schema, model } from "mongoose";
import { Address } from "samolet-common/db_types";

const AddressSchema = new Schema<Address>(
    {
        city: { type: String, required: true },
        country: { type: String, required: true },
        place: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default model("Address", AddressSchema);
