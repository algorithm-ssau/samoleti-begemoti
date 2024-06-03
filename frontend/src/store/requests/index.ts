import type { AuthSuccess, PersonalInfo, Booking } from "samolet-common";
import type { TAddress } from "samolet-common/src/network/address";
import type { THotel, THotelWithoutId } from "samolet-common/src/network/hotel";
import type { TRoomWithoutId, TRoom } from "samolet-common/src/network/room";
import { empty, type RequestState } from "../utils/tracker";
import type { TUser } from "samolet-common/src/network/user";

export * from "./profile";

type Convert<T> = {
    -readonly [K in keyof T]: T[K] extends RequestState<infer A, infer B>
        ? RequestState<A, B>
        : undefined;
};

export const requestsInitialValues = {
    register: empty<AuthSuccess>(),
    login: empty<AuthSuccess>(),
    users: empty<TUser[]>(),
    getallhotels: empty<Array<THotel>>(),
    createhotel: empty<THotel>(),
    createaddress: empty<TAddress>(),
    createroom: empty<TRoomWithoutId>(),
    getToken: empty<AuthSuccess>(),
    getUserPersonalInfo: empty<PersonalInfo>(),
    updatePersonalInfo: empty<void>(),
    updatePassword: empty<void>(),
    book: empty<void>(),
    bookings: empty<Booking[]>(),
    hotelById: empty<THotel>(),
    roomById: empty<TRoom>(),
    creatHotel: empty<THotelWithoutId>(),
    creatRoom: empty<TRoomWithoutId>(),
} as const;

export type Requests = Convert<typeof requestsInitialValues>;
