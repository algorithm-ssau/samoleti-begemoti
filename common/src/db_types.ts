import { Review, User } from "./user_type";

export type * from "./user_type";

import { AuthSuccess } from "./network/auth";
import { Network } from "./network";
export { type AuthSuccess, Network };
export * from "./network";
export interface ModelAddition {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Hotel {
    name: string;
    description: string;
    photos: Photo[];
    address: Address;
    rooms: Room[];
    reviews: Review[];
}

export interface Address {
    city: string;
    country: string;
    place: string;
}

enum BookingStatus {
    Paid = 0,
    NotPaid = 1,
    Finished = 2,
    InProcess = 3,
}

export interface HotelBooking {
    room: Room;
    dateStart: Date;
    dateEnd: Date;
    status: BookingStatus;
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

export enum RoomCategory {
    Luxary = 0,
    Normal = 1,
    Shit = 2,
}

export interface HotelFacilities {
    name: string;
}

export interface Room {
    category: RoomCategory;
    price: number;
    bedAmount: number;
    facilities: HotelFacilities[];
    number: number;
}

export interface Photo {
    imageUrl: String;
}
