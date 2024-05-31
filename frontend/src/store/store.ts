import {
    createSlice,
    configureStore,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { empty, trackRequest, type RequestState } from "./tracker";
import { type AuthSuccess } from "samolet-common";
import { network } from "..";
import { getUserPersonalInfoThunk } from "./requestThunks";

export type State = {
    value: number;

    requests: {
        register: RequestState<AuthSuccess, any>;
        login: RequestState<AuthSuccess, any>;
        getToken: RequestState<AuthSuccess, any>;
        getUserPersonalInfo: RequestState<AuthSuccess, any>;
    };
    isLogin: boolean;
    id: string;
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
export const getTokenThunk = createAsyncThunk("getToken", async () => {
    return await network.auth.gosling().then(x => x.data);
});
const initialState: State = {
    value: 0,
    requests: {
        register: empty(),
        login: empty(),
        getToken: empty(),
        getUserPersonalInfo: empty(),
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
        },
    },
    extraReducers: builder => {
        trackRequest(builder, "register", registerThunk);
        trackRequest(builder, "login", loginThunk);
        trackRequest(builder, "getToken", getTokenThunk);
        //trackRequest(builder, "getUserPersonalInfo", getUserPersonalInfoThunk);        /
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
