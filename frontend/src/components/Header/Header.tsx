import { Key } from "@mui/icons-material";
import {
    Button,
    Container,
    ContainerCenter,
    ContainerProfile,
    ContainerIco,
    Ico,
    PName,
} from "./style";
import { IconButton } from "@mui/material";

export interface HeaderProps {
    login: boolean;
    onTicketClicked: () => void;
    onHotelClicked: () => void;
    onRoutClicked: () => void;
    onProfileClicked: (login: boolean) => void;
}
export function Header(props: HeaderProps) {
    return (
        <Container>
            <ContainerIco>
                <Ico src="hippopotamus.ico" alt="hippopotamus" />
                <PName>samoleti-begemoti</PName>
            </ContainerIco>
            <ContainerCenter>
                <Button onClick={() => props.onTicketClicked()}>Отели</Button>
                <Button onClick={() => props.onHotelClicked()}>Билеты</Button>
                <Button onClick={() => props.onRoutClicked()}>Маршруты</Button>
            </ContainerCenter>
            <ContainerProfile>
                {props.login ? (
                    <>
                        <Key />
                    </>
                ) : (
                    <>
                        <IconButton
                            size="large"
                            onClick={() => props.onProfileClicked(props.login)}
                        >
                            <Key fontSize="inherit" />
                        </IconButton>
                    </>
                )}
            </ContainerProfile>
        </Container>
    );
}
