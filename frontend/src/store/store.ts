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

export type State = {
    value: number;
    requests: {
        register: RequestState<AuthSuccess, any>;
    };
};

export const registerThunk = createAsyncThunk(
    "register",
    async (creds: { login: string; password: string }) => {
        return await network
            .register(creds.login, creds.password)
            .then(x => x.data);
    },
);

const initialState: State = {
    value: 0,
    requests: {
        register: empty(),
    },
};

const slice = createSlice({
    name: "banks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        trackRequest(builder, "register", registerThunk);
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
