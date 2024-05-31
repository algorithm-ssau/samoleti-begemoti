import { Schema, model } from "mongoose";
import { PersonalInfo } from "samolet-common";

const PersonalInfoSchema = new Schema<PersonalInfo>(
    {
        name: String,
        surname: String,
        patronim: String,
        cardNumber: Number,
        passport: { type: Schema.Types.ObjectId, ref: "Passport" },
    },
    {
        timestamps: true,
    }
);

export const PersonalInfoModel = model("PersonalInfo", PersonalInfoSchema);
