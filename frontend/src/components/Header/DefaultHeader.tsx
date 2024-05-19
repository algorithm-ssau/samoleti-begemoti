import { useNavigate } from "react-router";
import { Header } from "./Header";

interface Props {}

export function DefaultHeader(props: Props) {
    const navigate = useNavigate();

    return (
        <Header
            onHotelClicked={() => {}}
            onProfileClicked={() => navigate("/auth")}
            onRoutClicked={() => {}}
            onTicketClicked={() => {}}
            login={false}
        />
    );
}
