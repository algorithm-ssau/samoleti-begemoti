import { Schema, model } from "mongoose";
import { Photo } from "samolet-common/db_types";

const PhotoSchema = new Schema<Photo>(
    {
        imageUrl: String,
    },
    {
        timestamps: true,
    }
);

export default model("Photo", PhotoSchema);
