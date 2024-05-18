import { useNavigate } from "react-router";
import { ProfileHeader } from "./Header";

interface Props {}

export function DefaultHeader(props: Props) {
    const navigate = useNavigate();
    return (
        <>
            <ProfileHeader
                onPersonalDataClicked={() => navigate("setting")}
                onBookingClicked={() => navigate("booking")}
                onTicketsClicked={() => navigate("setting")}
                onCashClicked={() => navigate("cash")}
            />
        </>
    );
}
