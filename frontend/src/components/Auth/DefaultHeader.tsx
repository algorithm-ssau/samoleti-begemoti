import { useNavigate } from "react-router";
import { AuthHeader } from "./AuthHeader";

interface Props {}

export function DefaultHeader(props: Props) {
    const navigate = useNavigate();
    return (
        <>
            <AuthHeader
                onRegistrationClicked={() => navigate("auth")}
                onEntryClicked={() => navigate("entry")}
            />
        </>
    );
}
