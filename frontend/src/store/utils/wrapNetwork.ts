import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { getNetwork } from "../../network";

const network = getNetwork();
export const createRoomThunk = wrapNetwork("createRoom", network.room.create);

export function wrapNetwork<T extends string, Value, Arg>(
    name: T,
    request: (arg: Arg) => Promise<AxiosResponse<Value, any>>,
) {
    return createAsyncThunk(name, async (arg: Arg) => {
        return await request(arg).then(x => x.data);
    });
}

export type NetworkDescription = {
    [k: string]: NetworkItem<any, any>;
};

type NetworkItem<Value, Arg> = (arg: Arg) => Promise<AxiosResponse<Value, any>>;

export type NetworkThunks<D extends NetworkDescription> = {
    [K in keyof D]: K extends string
        ? D[K] extends NetworkItem<infer V, infer A>
            ? ReturnType<typeof wrapNetwork<K, V, A>>
            : undefined
        : undefined;
};

export function fromDescription<Description extends NetworkDescription>(
    description: Description,
): NetworkThunks<Description> {
    const entries: (keyof Description & string)[] = Object.keys(description);

    const result = {} as NetworkThunks<Description>;
    for (let name of entries) {
        const request = description[name]!;
        result[name] = wrapNetwork(name, request) as any;
    }

    return result;
}
