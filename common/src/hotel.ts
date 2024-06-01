import { Address, Room } from "./db_types";

export type NewHotelRequest = {
    name: string;
    description?: string;
    address: Address;
    rooms: Partial<Room>[];
};
