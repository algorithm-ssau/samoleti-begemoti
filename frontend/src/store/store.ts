import {
    createSlice,
    configureStore,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { autoTrack, empty, trackRequest } from "./utils/tracker";
import { type Address } from "samolet-common";

import {
    bookThunk,
    bookingsThunk,
    hotelByIdThunk,
    roomThunks,
    updatePasswordThunk,
} from "./requestThunks";
import {
    profileThunks,
    requestsInitialValues,
    type Requests,
} from "./requests";
import { network } from "../network";
export * from "./requests";
export type State = {
    value: number;
    requests: Requests;
    isLogin: boolean;
    id: string;
};

export const registerThunk = createAsyncThunk(
    "register",
    async (creds: { login: string; password: string }) => {
        return await network.auth
            .register(creds.login, creds.password)
            .then(x => {
                network.setToken(x.data.token);
                return x.data;
            });
    },
);

export const loginThunk = createAsyncThunk(
    "login",
    async (creds: { login: string; password: string }) => {
        return await network.auth.login(creds.login, creds.password).then(x => {
            network.setToken(x.data.token);
            localStorage.setItem("token", x.data.token);
            return x.data;
        });
    },
);
export const getTokenThunk = createAsyncThunk("getToken", async () => {
    return; // await network.auth.gosling().then(x => x.data);
});

export const getAllHotelsThunk = createAsyncThunk("getallhotels", async () => {
    return await network.hotel.getAll().then(x => x.data);
});

export const createAddressThunk = createAsyncThunk(
    "createaddress",
    async (creds: Address) => {
        return await network.address.create(creds).then(x => x.data);
    },
);

const initialState: State = {
    value: 0,
    requests: requestsInitialValues,
    isLogin: false,
    id: "",
};

const slice = createSlice({
    name: "banks",
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload;
        },
        setId(state, action: PayloadAction<string>) {
            state.id = action.payload;
        },
        reset(state) {
            state.requests.login = empty();
            state.requests.getUserPersonalInfo = empty();
            localStorage.clear();
        },
    },
    extraReducers: builder => {
        autoTrack(builder, roomThunks);
        autoTrack(builder, profileThunks);
        trackRequest(builder, "register", registerThunk);
        trackRequest(builder, "login", loginThunk);
        trackRequest(builder, "getallhotels", getAllHotelsThunk);
        trackRequest(builder, "createaddress", createAddressThunk);
        //trackRequest(builder, "getToken", getTokenThunk);
        trackRequest(builder, "updatePassword", updatePasswordThunk);
        trackRequest(builder, "book", bookThunk);
        trackRequest(builder, "bookings", bookingsThunk);
        trackRequest(builder, "hotelById", hotelByIdThunk);
    },
});

const reducer = slice.reducer;
export const store = configureStore({
    reducer,
});

const actions = slice.actions;
export { actions };

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<State>();
export function useRequest<T>(selector: (requests: State["requests"]) => T): T {
    return useAppSelector(state => selector(state.requests));
}
