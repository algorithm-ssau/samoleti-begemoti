import {
    createSlice,
    configureStore,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { empty, trackRequest, type RequestState } from "./tracker";
import {
    type Address,
    type AuthSuccess,
    type Hotel,
    type Photo,
    type Review,
    type Room,
} from "samolet-common";
import { network } from "..";
import {
    type THotel,
    type THotelWithoutId,
} from "samolet-common/src/network/hotel";
import type { TAddress, TAddressWithoutId } from "samolet-common/src/network/address";
import type { TRoomWithoutId } from "samolet-common/src/network/room";

export type State = {
    value: number;
    requests: {
        register: RequestState<AuthSuccess, any>;
        login: RequestState<AuthSuccess, any>;
        getallhotels: RequestState<Array<THotel>, any>;
        createhotel: RequestState<THotelWithoutId, any>;
        createaddress: RequestState<TAddress, any>;
        createroom: RequestState<TRoomWithoutId, any>;
    };
};

export const registerThunk = createAsyncThunk(
    "register",
    async (creds: { login: string; password: string }) => {
        return await network.auth
            .register(creds.login, creds.password)
            .then(x => x.data);
    },
);
export const loginThunk = createAsyncThunk(
    "login",
    async (creds: { login: string; password: string }) => {
        return await network.auth
            .login(creds.login, creds.password)
            .then(x => x.data);
    },
);

export const getAllHotelsThunk = createAsyncThunk("getallhotels", async () => {
    return await network.hotel.getAll().then(x => x.data);
});

export const createHotelThunk = createAsyncThunk(
    "createhotel",
    async (creds: Hotel) => {
        return await network.hotel
            .create(creds)
            .then(x => x.data);
    },
);

export const createAddressThunk = createAsyncThunk(
    "createaddress",
    async (creds: Address) => {
        return await network.address
            .create(creds)
            .then(x => x.data);
    },
);

export const createRoomThunk = createAsyncThunk(
    "createroom",
    async (creds: Room) => {
        return await network.room
            .create(creds)
            .then(x => x.data);
    },
);

const initialState: State = {
    value: 0,
    requests: {
        register: empty(),
        login: empty(),
        getallhotels: empty(),
        createhotel: empty(),
        createaddress: empty(),
        createroom: empty(),
    },
};

const slice = createSlice({
    name: "banks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        trackRequest(builder, "register", registerThunk);
        trackRequest(builder, "login", loginThunk);
        trackRequest(builder, "getallhotels", getAllHotelsThunk);
        trackRequest(builder, "createhotel", createHotelThunk);
        trackRequest(builder, "createaddress", createAddressThunk);
        trackRequest(builder, "createroom", createRoomThunk);
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
