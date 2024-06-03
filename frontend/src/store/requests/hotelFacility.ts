import type { HotelFacilities } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createhotelFacility: network.hotelFacility.create,
    hotelFacilityById: network.hotelFacility.getById,
    getAllhotelFacilites: network.hotelFacility.getAll,
    deletehotelFacilityById: network.hotelFacility.deleteById,
    updatehotelFacilityById: (data: {
        id: number;
        newHotelFacility: HotelFacilities;
    }) => network.hotelFacility.updateById(data.id, data.newHotelFacility),
} satisfies NetworkDescription;

export const hotelFacilityThunks = fromDescription(description);
