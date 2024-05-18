import { Review, User } from "./user_type";

export type * from "./user_type";

export type { AuthSuccess } from "./network/auth";

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
    Paid,
    NotPaid,
    Finished,
    InProcess,
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
    Luxary,
    Normal,
    Shit,
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
