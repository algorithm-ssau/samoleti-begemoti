import { useNavigate } from "react-router";
import { Header } from "./Header";
import { useAppSelector } from "../../store/store";

interface Props {}

export function DefaultHeader(props: Props) {
    const navigate = useNavigate();
    const log = useAppSelector(state => state.isLogin);
    return (
        <Header
            onLogoClicked={() => navigate("/")}
            onHotelClicked={() => navigate("/hotel")}
            onProfileClicked={() =>
                log ? navigate("/profile/settings") : navigate("/auth/entry")
            }
            onRouteClicked={() => navigate("/admin")} //"rout"
            onTicketClicked={() => navigate("/admin")}
            login={log}
        />
    );
}
