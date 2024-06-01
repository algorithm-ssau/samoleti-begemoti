import { createAsyncThunk } from "@reduxjs/toolkit";
import { network } from "..";
import { users } from "../example_data/ProfileData";
import type { BookingRequest } from "samolet-common";

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
