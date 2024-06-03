import type { AuthSuccess, PersonalInfo, Booking } from "samolet-common";
import type { TAddress } from "samolet-common/src/network/address";
import type { THotel, THotelWithoutId } from "samolet-common/src/network/hotel";
import type { TRoomWithoutId, TRoom } from "samolet-common/src/network/room";
import { empty, type RequestState } from "../utils/tracker";
import {
    type THotelBookingWithoutId,
    type THotelBooking,
} from "samolet-common/src/network/hotelBooking";
import type {
    THotelFacility,
    THotelFacilityWithoutId,
} from "samolet-common/src/network/hotelFacility";
import type { TPhoto, TPhotoWithoutId } from "samolet-common/src/network/photo";
import type {
    TReview,
    TReviewWithoutId,
} from "samolet-common/src/network/review";
import type {
    TRoomCategory,
    TRoomCategoryWithoutId,
} from "samolet-common/src/network/roomCategory";
import type { TUser, TUserWithoutId } from "samolet-common/src/network/user";

export * from "./profile";
export * from "./room";
export * from "./hotel";
export * from "./address";
export * from "./auth";
export * from "./hotelBooking";
export * from "./hotelFacility";
export * from "./photo";
export * from "./review";
export * from "./roomCategory";
export * from "./user";

type Convert<T> = {
    -readonly [K in keyof T]: T[K] extends RequestState<infer A, infer B>
        ? RequestState<A, B>
        : undefined;
};

export const requestsInitialValues = {
    register: empty<AuthSuccess>(),
    login: empty<AuthSuccess>(),
    users: empty<TUser[]>(),
    getAllHotels: empty<Array<THotel>>(),
    createHotel: empty<THotel>(),
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
    //creatHotel: empty<THotelWithoutId>(),
    creatRoom: empty<TRoomWithoutId>(),
    hotelsByPlace: empty<Array<THotel>>(),
    hotelDeleteById: empty<THotel>(),
    hotelUpdateById: empty<THotel>(),
    getAllRoom: empty<TRoom>(),
    deleteRoomById: empty<TRoom>(),
    updateRoomById: empty<TRoom>(),
    addressById: empty<TAddress>(),
    getAllAddresses: empty<Array<TAddress>>(),
    deleteAddressById: empty<TAddress>(),
    updateAddressById: empty<TAddress>(),
    createbooking: empty<THotelBookingWithoutId>(),
    bookingById: empty<THotelBooking>(),
    getAllBookings: empty<Array<THotelBooking>>(),
    deleteBookingById: empty<THotelBooking>(),
    updateBookingById: empty<THotelBooking>(),
    createhotelFacility: empty<THotelFacilityWithoutId>(),
    hotelFacilityById: empty<THotelFacility>(),
    getAllhotelFacilites: empty<Array<THotelFacility>>(),
    deletehotelFacilityById: empty<THotelFacility>(),
    updatehotelFacilityById: empty<THotelFacility>(),
    createPhoto: empty<TPhotoWithoutId>(),
    photoById: empty<TPhoto>(),
    getAllPhotos: empty<Array<TPhoto>>(),
    deletePhotoById: empty<TPhoto>(),
    updatePhotoById: empty<TPhoto>(),
    createreview: empty<TReviewWithoutId>(),
    reviewById: empty<TReview>(),
    getAllReviews: empty<Array<TReview>>(),
    deleteReviewById: empty<TReview>(),
    updateReviewById: empty<TReview>(),
    createroomCategory: empty<TRoomCategoryWithoutId>(),
    roomCategoryById: empty<TRoomCategory>(),
    getAllroomCategories: empty<Array<TRoomCategory>>(),
    deleteroomCategoryById: empty<TRoomCategory>(),
    updateroomCategoryById: empty<TRoomCategory>(),
    createuser: empty<TUserWithoutId>(),
    userById: empty<TUser>(),
    getAllUsers: empty<Array<TUser>>(),
    deleteUserById: empty<TUser>(),
    updateUserById: empty<TUser>(),
} as const;

export type Requests = Convert<typeof requestsInitialValues>;
