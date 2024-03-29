import { Schema, model } from "mongoose";
import { Review } from "../types/user_type";

const ReviewSchema = new Schema<Review>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        title: { type: String },
        content: { type: String },
        mark: { type: Number },
        photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
    },
    {
        timestamps: true,
    }
);

export default model("Review", ReviewSchema);
