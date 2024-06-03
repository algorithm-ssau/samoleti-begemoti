import {
    createSlice,
    configureStore,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { autoTrack, empty } from "./utils/tracker";

import {
    addressThunks,
    authThunks,
    hotelBookingThunks,
    hotelFacilityThunks,
    hotelThunks,
    photoThunks,
    profileThunks,
    requestsInitialValues,
    reviewThunks,
    roomCategoryThunks,
    roomThunks,
    userThunks,
    type Requests,
} from "./requests";
export * from "./requests";
export type State = {
    value: number;
    requests: Requests;
    isLogin: boolean;
    id: string;
};

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
        autoTrack(builder, hotelThunks);
        autoTrack(builder, addressThunks);
        autoTrack(builder, authThunks);
        autoTrack(builder, hotelBookingThunks);
        autoTrack(builder, hotelFacilityThunks);
        autoTrack(builder, photoThunks);
        autoTrack(builder, reviewThunks);
        autoTrack(builder, roomCategoryThunks);
        autoTrack(builder, userThunks);
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
