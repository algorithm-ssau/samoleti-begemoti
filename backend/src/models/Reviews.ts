import { Schema, model } from "mongoose";
import { Review } from "samolet-common";

const ReviewSchema = new Schema<Review>(
    {
        user: { type: Schema.Types.ObjectId, ref: "UserForReview" },
        topText: { type: String },
        bottomText: { type: String },
        rating: { type: Number },
        photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
    },
    {
        timestamps: true,
    }
);

export default model("Review", ReviewSchema);
