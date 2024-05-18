import { useNavigate } from "react-router";
import { Header } from "./Header";

interface Props {}

export function DefaultHeader(props: Props) {
    const navigate = useNavigate();
    const log = false;
    return (
        <Header
            onHotelClicked={() => navigate("/hotel")}
            onProfileClicked={() =>
                log ? navigate("/profile/setting") : navigate("/auth")
            }
            onRoutClicked={() => navigate("/profile/setting")} //"rout"
            onTicketClicked={() => navigate("/test")}
            login={log}
        />
    );
}
