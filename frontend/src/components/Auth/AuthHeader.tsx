import { Button, Container } from "../Profile/ProfileHeader/style";

interface AuthHeaderProps {
    onRegistrationClicked: () => void;
    onEntryClicked: () => void;
}

export function AuthHeader(props: AuthHeaderProps) {
    return (
        <>
            <Container>
                <Button onClick={() => props.onEntryClicked()}>
                    Вход в профиль
                </Button>
                <Button onClick={() => props.onRegistrationClicked()}>
                    Регистрация
                </Button>
            </Container>
        </>
    );
}
