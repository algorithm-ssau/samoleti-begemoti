import {
    type ActionReducerMapBuilder,
    type AsyncThunk,
    type PayloadAction,
    type Dispatch,
} from "@reduxjs/toolkit";
import type { NetworkDescription, NetworkThunks } from "./wrapNetwork";
import { type State as AppState } from "../store";
// copied from @reduxjs/toolkit/createAsyncThunk.d.ts because it's private
export type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
};

type RequestFulfilled<T> = {
    status: "fulfilled";
    value: T;
};

type RequestNone<T> = {
    status: "none";
    value: null;
};

/**
 * `value` may contain previous filfilled result
 */
type RequestPending<T> = {
    status: "pending";
    value: T | null;
};

/**
 * `value` may contain previous filfilled result
 */
type RequestError<T, E> = {
    status: "error";
    value: T | null;
    error: E;
};

export type RequestState<T, E> =
    | RequestNone<T>
    | RequestFulfilled<T>
    | RequestPending<T>
    | RequestError<T, E>;

export function empty<T>(): RequestNone<T> {
    return {
        value: null,
        status: "none",
    };
}

export function trackRequest<
    ReturnValue,
    RequestError,
    X extends AsyncThunkConfig,
    State extends {
        requests: {
            [K in SpecialKey]: RequestState<ReturnValue, RequestError>;
        };
    },
    SpecialKey extends keyof State["requests"] & string,
    ThunkArg,
>(
    builder: ActionReducerMapBuilder<State>,
    stateParameter: SpecialKey,
    thunker: AsyncThunk<ReturnValue, ThunkArg, X>,
    helper?: {
        fulfill: (state: State, action: PayloadAction<ReturnValue>) => void;
    },
) {
    builder.addCase(thunker.fulfilled, (_state, action) => {
        let state = _state as State;

        state.requests[stateParameter].status = "fulfilled";
        state.requests[stateParameter].value = action.payload;

        helper?.fulfill(state as State, action);
    });
    builder.addCase(thunker.rejected, _state => {
        let state = _state as State;
        state.requests[stateParameter].status = "error";
    });
    builder.addCase(thunker.pending, _state => {
        let state = _state as State;
        state.requests[stateParameter].status = "pending";
    });
}

// export function autoTrack<
//     Description extends NetworkDescription,
//     Thunks extends {
//         [K in SpecialKey]: State["requests"][K];
//     },
//     ReturnValue,
//     RequestError,
//     X extends AsyncThunkConfig,
//     State extends {
//         requests: {
//             [K in SpecialKey]: RequestState<ReturnValue, RequestError>;
//         };
//     },
//     SpecialKey extends keyof State["requests"] & string,
//     ThunkArg,
// >(
//     builder: ActionReducerMapBuilder<State>,
//     initialState: State,
//     thunks: Thunks,
// ) {
//     const keys: (keyof Thunks)[] = Object.keys(thunks);
//     Object.entries(thunks);
//     for (let key of keys) {
//         trackRequest(builder, key, thunks[key]!);
//     }
// }

type Thunk<Return, Arg> = AsyncThunk<Return, Arg, AsyncThunkConfig>;

// export function checkProperties<
//     Thunks extends {
//         [K in keyof AppState["requests"]]: AppState["requests"][K] extends RequestState<
//             infer R,
//             infer E
//         >
//             ? Thunk<R, any>
//             : undefined;
//     },
//     RequestError,
// >(thunks: Thunks): Thunks {
//     return thunks;
// }

// type Thunkers = {
//     name: "thunk";
// };

/**
 * Очень опасная функция, никаких проверок, использовать аккуратно
 */
type AutoTrackThunks = {
    [requestKey: string]: Thunk<any, any>;
};

export function autoTrack(builder: any, thunks: AutoTrackThunks) {
    for (let [requestKey, thunk] of Object.entries(thunks)) {
        trackRequest(builder, requestKey as never, thunk as any);
    }
}
