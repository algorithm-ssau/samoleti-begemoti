import ExploreIcon from "@mui/icons-material/Explore";
import { Key, Person } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import {
    Button,
    Container,
    CentralContainer,
    IconContainer,
    Text,
    ProfileContainer,
} from "./style";

interface Props {
    login: boolean;
    onLogoClicked?: () => void;
    onTicketClicked: () => void;
    onHotelClicked: () => void;
    onRouteClicked: () => void;
    onProfileClicked: (login: boolean) => void;
}

export function Header(props: Props) {
    return (
        <Container>
            <IconContainer onClick={props.onLogoClicked}>
                <ExploreIcon />
                <Text>samoleti-begemoti</Text>
            </IconContainer>
            <CentralContainer>
                <Button onClick={props.onHotelClicked}>Отели</Button>
                <Button onClick={props.onTicketClicked}>Билеты</Button>
                <Button onClick={props.onRouteClicked}>Маршруты</Button>
            </CentralContainer>
            <ProfileContainer>
                <IconButton
                    size="large"
                    onClick={() => props.onProfileClicked(props.login)}
                >
                    {props.login ? (
                        <Person fontSize="inherit" />
                    ) : (
                        <Key fontSize="inherit" />
                    )}
                </IconButton>
            </ProfileContainer>
        </Container>
    );
}
