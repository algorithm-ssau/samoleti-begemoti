import { createAsyncThunk } from "@reduxjs/toolkit";
import { network } from "..";
import { users } from "../example_data/ProfileData";
import type {
    Address,
    BookingRequest,
    Hotel,
    HotelFacilities,
    Photo,
    Review,
    Room,
    RoomCategory,
} from "samolet-common";

export const usersThunk = createAsyncThunk("users", async () => {
    return await network.user.getAll().then(x => x.data);
});

export const getUserPersonalInfoThunk = createAsyncThunk(
    "getUserPersonalInfo",
    async () => {
        return await network.profile.info().then(x => x.data);
        //return users.find(x => x._id === creds.id)!;
    },
);
export const updatePersonalInfoThunk = createAsyncThunk(
    "updatePersonalInfo",
    async (creds: { name: string; surname: string; cardNumber: number }) => {
        return await network.profile
            .update({
                name: creds.name,
                surname: creds.surname,
                cardNumber: creds.cardNumber,
                patronim: "",
            })
            .then(x => x.data);
    },
);
export const updatePasswordThunk = createAsyncThunk(
    "updatePassword",
    async (creds: { oldPassword: string; newPassword: string }) => {
        return await network.profile
            .changePassword(creds.oldPassword, creds.newPassword)
            .then(x => x.data);
    },
);

export const bookThunk = createAsyncThunk(
    "book",
    async (creds: {
        dateFrom: number;
        dateTo: number;
        hotelId: string;
        roomId: string;
        sum: number;
        comment: string;
        visitorsNumber: number;
    }) => {
        return await network.user
            .book({
                dateFrom: creds.dateFrom,
                dateTo: creds.dateTo,
                hotelId: creds.hotelId,
                roomId: creds.roomId,
                sum: creds.sum,
                comment: creds.comment,
                //visitorsNumber: creds.visitorsNumber,
            } as BookingRequest)
            .then(x => x.data);
    },
);
export const bookingsThunk = createAsyncThunk("bookings", async () => {
    return await network.user.bookings().then(x => x.data);
});
export const hotelByIdThunk = createAsyncThunk(
    "hotelById",
    async (creds: { id: string }) => {
        return await network.hotel.getById(creds.id).then(x => x.data);
    },
);
export const roomByIdThunk = createAsyncThunk(
    "roomById",
    async (creds: { id: number }) => {
        return await network.room.getById(creds.id).then(x => x.data);
    },
);

export const creatHotelThunk = createAsyncThunk(
    "creatHotel",
    async (creds: {
        name: string;
        description: string;
        photos: Photo[];
        address: Address;
        rooms: Room[];
        reviews: Review[];
    }) => {
        return await network.hotel
            .create({
                name: creds.name,
                description: creds.description,
                photos: creds.photos,
                address: creds.address,
                rooms: creds.rooms,
                reviews: creds.reviews,
            } as Hotel)
            .then(x => x.data);
    },
);
export const creatRoomThunk = createAsyncThunk(
    "creatRoom",
    async (creds: {
        category: RoomCategory;
        price: number;
        bedAmount: number;
        facilities: HotelFacilities[];
        number: number;
    }) => {
        return await network.room
            .create({
                category: creds.category,
                price: creds.price,
                bedAmount: creds.bedAmount,
                facilities: creds.facilities,
                number: creds.number,
            } as Room)
            .then(x => x.data);
    },
);
