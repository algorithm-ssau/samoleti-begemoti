import {
    createSlice,
    configureStore,
    createAsyncThunk,
    type PayloadAction,
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
    type Booking,
    type PersonalInfo,
    type User,
} from "samolet-common";
import { network } from "..";
import {
    bookThunk,
    bookingsThunk,
    creatHotelThunk,
    creatRoomThunk,
    getUserPersonalInfoThunk,
    hotelByIdThunk,
    roomByIdThunk,
    updatePasswordThunk,
    updatePersonalInfoThunk,
} from "./requestThunks";
import type { TAddress } from "samolet-common/src/network/address";
import type { THotel, THotelWithoutId } from "samolet-common/src/network/hotel";
import type { TRoomWithoutId, TRoom } from "samolet-common/src/network/room";

export type State = {
    value: number;

    requests: {
        register: RequestState<AuthSuccess, any>;
        login: RequestState<AuthSuccess, any>;
        getallhotels: RequestState<Array<THotel>, any>;
        createhotel: RequestState<THotelWithoutId, any>;
        createaddress: RequestState<TAddress, any>;
        createroom: RequestState<TRoomWithoutId, any>;
        getToken: RequestState<AuthSuccess, any>;
        getUserPersonalInfo: RequestState<PersonalInfo, any>;
        updatePersonalInfo: RequestState<void, any>;
        updatePassword: RequestState<void, any>;
        book: RequestState<void, any>;
        bookings: RequestState<Booking[], any>;
        hotelById: RequestState<THotel, any>;
        roomById: RequestState<TRoom, any>;
        creatHotel: RequestState<THotelWithoutId, any>;
        creatRoom: RequestState<TRoomWithoutId, any>;
    };
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

export const createHotelThunk = createAsyncThunk(
    "createhotel",
    async (creds: Hotel) => {
        return await network.hotel.create(creds).then(x => x.data);
    },
);

export const createAddressThunk = createAsyncThunk(
    "createaddress",
    async (creds: Address) => {
        return await network.address.create(creds).then(x => x.data);
    },
);

export const createRoomThunk = createAsyncThunk(
    "createroom",
    async (creds: Room) => {
        return await network.room.create(creds).then(x => x.data);
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
        getToken: empty(),
        getUserPersonalInfo: empty(),
        updatePersonalInfo: empty(),
        updatePassword: empty(),
        book: empty(),
        bookings: empty(),
        hotelById: empty(),
        roomById: empty(),
        creatHotel: empty(),
        creatRoom: empty(),
    },
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
        trackRequest(builder, "register", registerThunk);
        trackRequest(builder, "login", loginThunk);
        trackRequest(builder, "getallhotels", getAllHotelsThunk);
        trackRequest(builder, "createhotel", createHotelThunk);
        trackRequest(builder, "createaddress", createAddressThunk);
        trackRequest(builder, "createroom", createRoomThunk);
        //trackRequest(builder, "getToken", getTokenThunk);
        trackRequest(builder, "getUserPersonalInfo", getUserPersonalInfoThunk);
        trackRequest(builder, "updatePersonalInfo", updatePersonalInfoThunk);
        trackRequest(builder, "updatePassword", updatePasswordThunk);
        trackRequest(builder, "book", bookThunk);
        trackRequest(builder, "bookings", bookingsThunk);
        trackRequest(builder, "hotelById", hotelByIdThunk);
        trackRequest(builder, "roomById", roomByIdThunk);
        trackRequest(builder, "creatHotel", creatHotelThunk);
        trackRequest(builder, "creatRoom", creatRoomThunk);
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
