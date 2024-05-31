import { createAsyncThunk } from "@reduxjs/toolkit";
import { network } from "..";
import { users } from "../example_data/ProfileData";

export const usersThunk = createAsyncThunk("users", async () => {
    return await network.users().then(x => x.data);
});

export const getUserPersonalInfoThunk = createAsyncThunk(
    "getUserPersonalInfo",
    async (creds: { id: string }) => {
        //  return await network.auth
        //  .getUserPersonalInfo(creds.id)
        //  .then(x => x.data);
        return users.find(x => x._id === creds.id)!;
    },
);
