import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const getData = async (url: string) =>
    await axios
        .get(url)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });

export async function unauthorized<T>(networkCall: () => Promise<T>) {
    const { status } = await axiosRejects(networkCall());
    expect(status).toBe(401);
}

export async function promiseRejects<T>(promise: Promise<T>): Promise<any> {
    try {
        await promise;
        fail();
    } catch (err) {
        return err;
    }
}

export async function axiosRejects<T>(
    promise: Promise<T>
): Promise<AxiosResponse<any, any>> {
    const error = await promiseRejects(promise);
    const isAxiosError = axios.isAxiosError(error);
    expect(isAxiosError).toBe(true);
    if (isAxiosError) {
        return error.response as any;
    }

    return {} as any;
}
