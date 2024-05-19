import { useNavigate } from "react-router-dom";
import { actions, getTokenThunk, useAppDispatch } from "../../../store/store";
import { network } from "../../..";

export function exit() {}
export function DataPersonal() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <button
                onClick={() => {
                    // navigate("/auth/entry");
                    network.setToken("");
                    dispatch(actions.setLogin(false));
                    // axios.get("/api");
                    dispatch(getTokenThunk());
                }}
            >
                Выйти
            </button>
        </>
    );
}
