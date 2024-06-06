import { Review, User } from "./user_type";

export type * from "./user_type";

import { AuthSuccess } from "./network/auth";
import { Network } from "./network";
export { type AuthSuccess, Network };

export * from "./network";
export * from "./booking";
export * from "./hotel";

export interface ModelAddition {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Hotel {
    name: string;
    description: string;
    photos: string[];
    address: Address;
    rooms: Room[];
    reviews: Review[];
    price: number;
}

export interface Address {
    city: string;
    country: string;
    place: string;
}

export interface HotelTransaction {
    type: "hotel";
    room: Room;
}

export interface AirplaneTransaction {
    type: "airplane";
    airplaneInfo: string;
}

export type SomeTransaction = HotelTransaction | AirplaneTransaction;

export type RoomCategory = "luxary" | "normal" | "bad";

export interface HotelFacilities {
    name: string;
}

export interface Room {
    category: RoomCategory;
    price: number;
    bedAmount: number;
    facilities: HotelFacilities[];
    number: number;
    photos: string[];
}

export interface Photo {
    imageUrl: String;
}
