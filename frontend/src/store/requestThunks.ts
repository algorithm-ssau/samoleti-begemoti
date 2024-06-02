import { createAsyncThunk } from "@reduxjs/toolkit";

import type { BookingRequest, NewHotelRequest, Room } from "samolet-common";
import { fromDescription, type NetworkDescription } from "./utils/wrapNetwork";
import { getNetwork } from "../network";

export const usersThunk = createAsyncThunk("users", async () => {
    return await network.user.getAll().then(x => x.data);
});

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

export const createHotelThunk = createAsyncThunk(
    "createHotel",
    async (hotel: NewHotelRequest) => {
        return await network.hotel.createFull(hotel).then(x => x.data);
    },
);
export const createRoomThunk = createAsyncThunk(
    "createRoom",
    async (room: Room) => {
        return await network.room.create(room).then(x => x.data);
    },
);

const network = getNetwork();
const description = {
    createRoom: network.room.create,
    createHotel: network.hotel.create,
    roomById: network.room.getById,
} satisfies NetworkDescription;

export const roomThunks = fromDescription(description);
