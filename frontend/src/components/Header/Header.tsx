import { NavLink } from "react-router-dom";
import {
    Button,
    Container,
    ContainerCenter,
    Profile,
    ContainerProfile,
    ContainerIco,
    Ico,
    PName,
} from "./style";

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
                <NavLink to="/hotel">
                    <Button onClick={() => props.onTicketClicked()}>
                        Отели
                    </Button>
                </NavLink>
                <NavLink to="/test">
                    <Button onClick={() => props.onHotelClicked()}>
                        Билеты
                    </Button>
                </NavLink>

                <NavLink to="/rout">
                    <Button onClick={() => props.onRoutClicked()}>
                        Маршруты
                    </Button>
                </NavLink>
            </ContainerCenter>
            <ContainerProfile>
                {props.login ? (
                    <Profile
                        src="key.ico"
                        alt="key"
                        onClick={() => props.onProfileClicked(props.login)}
                    />
                ) : (
                    <NavLink to="profile">
                        <Profile
                            src="profile.ico"
                            alt="profile"
                            onClick={() => props.onProfileClicked(props.login)}
                        />
                    </NavLink>
                )}
            </ContainerProfile>
        </Container>
    );
}
