import type { RoomCategory } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createroomCategory: network.roomCategory.create,
    roomCategoryById: network.roomCategory.getById,
    getAllRoomCategories: network.roomCategory.getAll,
    deleteRoomCategoryById: network.roomCategory.deleteById,
    updateRoomCategoryById: (data: {
        id: number;
        newRoomCategory: RoomCategory;
    }) => network.roomCategory.updateById(data.id, data.newRoomCategory),
} satisfies NetworkDescription;

export const roomCategoryThunks = fromDescription(description);
