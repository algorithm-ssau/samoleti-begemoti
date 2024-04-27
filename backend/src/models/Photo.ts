import { Schema, model } from "mongoose";
import { Photo } from "../types/db_types";

const PhotoSchema = new Schema<Photo>(
    {
        imageUrl: String,
    },
    {
        timestamps: true,
    }
);

export default model("Photo", PhotoSchema);
