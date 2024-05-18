import { Registration } from "../components/Auth/Registration/Registration";
import { registerThunk, useAppDispatch, useAppSelector } from "../store/store";

interface Props {}

export function AuthPage(props: Props) {
    let dispatch = useAppDispatch();
    let registerRequest = useAppSelector(state => state.requests.register);

    let status = registerRequest.status;
    let value = registerRequest.value;

    return (
        <>
            <Registration />
            <div>{status}</div>
            <div>{JSON.stringify(value)}</div>

            <button
                onClick={() =>
                    dispatch(registerThunk({ login: "я", password: "крутой" }))
                }
            >
                отправить запрос
            </button>
        </>
    );
}
