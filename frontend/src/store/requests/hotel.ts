import type { Hotel } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    //createHotel: network.hotel.create,
    hotelById: network.hotel.getById,
    hotelsByPlace: network.hotel.getByPlace,
    getAllHotels: network.hotel.getAll,
    createHotel: network.hotel.createFull,
    hotelDeleteById: network.hotel.deleteById,
    hotelUpdateById: (data: { id: number; newHotel: Hotel }) =>
        network.hotel.updateById(data.id, data.newHotel),
} satisfies NetworkDescription;

export const hotelThunks = fromDescription(description);
