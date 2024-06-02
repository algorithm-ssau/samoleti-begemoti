import { Schema, model } from "mongoose";
import { UserForReview } from "samolet-common";

const ReviewSchema = new Schema<UserForReview>(
    {
        profilePicture: { type: Schema.Types.ObjectId, ref: "Photo" },
        name: { type: String },
    },
    {
        timestamps: true,
    }
);

export default model("Review", ReviewSchema);
