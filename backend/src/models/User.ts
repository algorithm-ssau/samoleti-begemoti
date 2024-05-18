import { Schema, model } from "mongoose";
import { User } from "samolet-common";

const UserSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        info: { type: Schema.Types.ObjectId, ref: "PersonalInfo" },
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        account: { type: Schema.Types.ObjectId, ref: "BankAccount" },
        hotelHistory: [{ type: Schema.Types.ObjectId, ref: "HotelBooking" }],
    },
    {
        timestamps: true,
    }
);

export default model("User", UserSchema);
