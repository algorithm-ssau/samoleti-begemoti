import { createAsyncThunk } from "@reduxjs/toolkit";
import { network } from "..";
import {
    profileInfo,
    users,
    type ProfileInfo,
    type User,
} from "../example_data/ProfileData";

export const usersThunk = createAsyncThunk("users", async () => {
    return await network.users().then(x => x.data);
});

export function getUserPersonalInfoThunk(creds: { id: string }): User {
    return users.find(x => x.id === creds.id)!;
}
// export const getUserPersonalInfoThunk = createAsyncThunk(
//     "getUserPersonalInfo",
//     async (creds: { id: string }) => {
//          return await network.auth
//          .getUserPersonalInfo(creds.id)
//          .then(x => x.data);
//     },
// );
