import {
    createSlice,
    configureStore,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { empty, trackRequest, type RequestState } from "./tracker";
import {
    login as loginRequest,
    register,
    type AuthSuccess,
} from "samolet-common";
import { Password } from "@mui/icons-material";
import { network } from "..";

export const registerThunk = createAsyncThunk(
    "register",
    async (creds: { login: string; password: string }) => {
        return await network.auth
            .register(creds.login, creds.password)
            .then(x => x.data);
    },
);

export const goslingThunk = createAsyncThunk("gosling", async () => {
    return await network.auth.gosling().then(x => x.data);
});

export type State = {
    value: number;
    requests: {
        register: RequestState<AuthSuccess, any>;
        gosling: RequestState<string, any>;
    };
};

const initialState: State = {
    value: 0,
    requests: {
        register: empty(),
        gosling: empty(),
    },
};

const slice = createSlice({
    name: "banks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        trackRequest(builder, "register", registerThunk);
        trackRequest(builder, "gosling", goslingThunk);
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
