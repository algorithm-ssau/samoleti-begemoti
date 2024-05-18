import { createAsyncThunk } from "@reduxjs/toolkit";
import { network } from "..";

export const usersThunk = createAsyncThunk("users", async () => {
    return await network.users().then(x => x.data);
});
