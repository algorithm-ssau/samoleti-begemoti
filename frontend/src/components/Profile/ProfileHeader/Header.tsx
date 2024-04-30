import { Button, Container } from "./style";
interface ProfileHeaderProps {
    onPersonalDataClicked: () => void;
    onBookingClicked: () => void;
    onTicketsClicked: () => void;
    onCashClicked: () => void;
}

export function ProfileHeader(props: ProfileHeaderProps) {
    return (
        <Container>
            <Button onClick={() => props.onPersonalDataClicked()}>
                Личнные данные
            </Button>
            <Button onClick={() => props.onBookingClicked()}>Бронь</Button>
            <Button onClick={() => props.onTicketsClicked()}>Билеты</Button>
            <Button onClick={() => props.onCashClicked()}>Кошелек</Button>
        </Container>
    );
}
