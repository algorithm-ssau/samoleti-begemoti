import type { Photo } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createPhoto: network.photo.create,
    photoById: network.photo.getById,
    getAllPhotos: network.photo.getAll,
    deletePhotoById: network.photo.deleteById,
    updatePhotoById: (data: { id: number; newPhoto: Photo }) =>
        network.photo.updateById(data.id, data.newPhoto),
} satisfies NetworkDescription;

export const photoThunks = fromDescription(description);
