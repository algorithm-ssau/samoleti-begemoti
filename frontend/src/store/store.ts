import {
    createSlice,
    configureStore,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { empty, trackRequest, type RequestState } from "./tracker";
import { type AuthSuccess } from "samolet-common";
import { network } from "..";
import type { User } from "samolet-common/src/user_type";
import { usersThunk } from "./requestThunks";

export const registerThunk = createAsyncThunk(
    "register",
    async (creds: { login: string; password: string }) => {
        return await network
            .register(creds.login, creds.password)
            .then(x => x.data);
    },
);

export const goslingThunk = createAsyncThunk("gosling", async () => {
    return await network.gosling().then(x => x.data);
});

export type State = {
    value: number;
    requests: {
        register: RequestState<AuthSuccess, any>;
        gosling: RequestState<string, any>;
        users: RequestState<User[], any>;
    };
};

const initialState: State = {
    value: 0,
    requests: {
        register: empty(),
        gosling: empty(),
        users: empty(),
    },
};

const slice = createSlice({
    name: "banks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        trackRequest(builder, "register", registerThunk);
        trackRequest(builder, "gosling", goslingThunk);
        trackRequest(builder, "users", usersThunk);
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
