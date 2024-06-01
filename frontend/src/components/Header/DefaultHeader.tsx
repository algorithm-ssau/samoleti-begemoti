import { useNavigate } from "react-router";
import { Header } from "./Header";
import { useAppSelector } from "../../store/store";

interface Props {}

export function DefaultHeader(props: Props) {
    const navigate = useNavigate();
    const log = useAppSelector(state => state.isLogin);
    return (
        <Header
            onHotelClicked={() => navigate("/hotel")}
            onProfileClicked={() =>
                log ? navigate("/profile/settings") : navigate("/auth/entry")
            }
            onRoutClicked={() => navigate("/test")} //"rout"
            onTicketClicked={() => navigate("/test")}
            login={log}
        />
    );
}
