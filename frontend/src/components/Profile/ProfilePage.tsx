import { ProfileHeader } from "./ProfileHeader/Header";

interface LoginProps {
    log: boolean;
}
export function ProfilePage(props: LoginProps) {
    return (
        <div>
            {props.log && (
                <ProfileHeader
                    onPersonalDataClicked={() => {}}
                    onBookingClicked={() => {}}
                    onTicketsClicked={() => {}}
                    onCashClicked={() => {}}
                />
            )}
        </div>
    );
}
