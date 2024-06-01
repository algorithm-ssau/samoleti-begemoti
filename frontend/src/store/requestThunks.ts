import { createAsyncThunk } from "@reduxjs/toolkit";
import { network } from "..";
import { users } from "../example_data/ProfileData";

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
