import { DefaultHeader } from "../components/Profile/ProfileHeader/DefaultHeader";
import { ProfileRouter } from "../routers/ProfileRouter";

interface LoginProps {
    log: boolean;
}
export function ProfilePage(props: LoginProps) {
    return (
        <div>
            <DefaultHeader />
            <ProfileRouter />
        </div>
    );
}
