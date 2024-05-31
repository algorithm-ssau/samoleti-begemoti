import { Schema, model } from "mongoose";
import { Passport, PersonalInfo } from "samolet-common";

const PersonalInfoSchema = new Schema<Passport>(
    {
        serial: { type: Number, required: true },
        number: { type: Number, required: true },
        emitent: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const PassportModel = model("Passport", PersonalInfoSchema);
