import type { Room } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createroom: network.room.create,
    roomById: network.room.getById,
    getAllRooms: network.room.getAll,
    deleteRoomById: network.room.deleteById,
    updateRoomById: (data: { id: string; newRoom: Room }) =>
        network.room.updateById(data.id, data.newRoom),
} satisfies NetworkDescription;

export const roomThunks = fromDescription(description);
