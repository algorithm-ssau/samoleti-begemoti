import styled from "styled-components";
import { lightPrimary, primaryText, baseText } from "./BaseStyle";
import { Restaurant, Wifi } from "@mui/icons-material";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BathroomIcon from "@mui/icons-material/Bathroom";

import { useState } from "react";
import { Dialog } from "@mui/material";
import HotelReservation from "./HotelReservation";
import type { TRoom } from "samolet-common/src/network/room";
import { useAppSelector } from "../store/store";
import { useNavigate } from "react-router";

const Container = styled.div`
    display: flex;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 62%;
    margin: 5% auto;
    min-width: 350px;
    border-radius: 0px;
    align-items: center;
`;
const LeftContainer = styled.div`
    width: 50%;
    margin-top: 0%;
    margin-left: 2%;
    padding-right: 2%;
`;

const RightContainer = styled.div`
    width: 50%;
    margin: 0%;
    display: flex;
    justify-content: center;
    position: relative;
`;
const RowContainer = styled.div`
    width: 100%;
    margin: 0%;
    margin-left: 5%;
    margin-top: 2%;
    margin-bottom: 2%;
    display: flex;
    align-items: center;
    justify-content: left;
`;
const H2Name = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 36px;
    margin: 2% 2% 2% 0%;
    text-align: left;
`;
const H2Name2 = styled.h2`
    color: #4a4848;
    ${baseText}
    font-size: 18px;
    margin-right: 5%;
    text-align: left;
`;
const Photo = styled.img`
    width: 100%;
    margin: 0%;
`;
const Icon = styled.img`
    width: 50px;
    height: 50px;
    vertical-align: middle;
    margin: 0%;
    margin-right: 2%;
`;
const BookButton = styled.button`
    ${primaryText}
    ${baseText}
    font-size: 24px;
    display: block;
    text-align: center;
    vertical-align: middle;
    background-color: ${lightPrimary};
    box-shadow: 0px 2px 4px ${lightPrimary};
    margin: auto;
    margin-left: 0%;
    margin-top: 5%;
    margin-bottom: 3%;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 5%;
    padding-right: 5%;
    border-radius: 5px;
    border: 0px;
    cursor: pointer;
`;
const LeftButton = styled.div`
    width: 25%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    left: 0px;
`;
const RightButton = styled.div`
    width: 25%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    right: 0px;
`;
function LeftButtonClick() {
    alert("LeftButton was pressed");
}

function RightButtonClick() {
    alert("RightButton was pressed");
}

function BookButtonClick() {
    alert("BookButton was pressed");
}
interface Props {
    hotelId: string;
    rooms: TRoom[];
}
export function HotelRooms(props: Props) {
    let rooms = props.rooms.map(aRoom => (
        <HotelRoom {...{ hotelId: props.hotelId, room: aRoom }} />
    ));
    return <>{rooms}</>;
}
interface PropsRoom {
    hotelId: string;
    room: TRoom;
}
function HotelRoom(props: PropsRoom) {
    const {
        room: { photos },
    } = props;
    const roomName = "Название комнаты"; // получаем из бд
    const roomPrice = 2700; // получаем из бд
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const log = useAppSelector(state => state.isLogin);
    const photoUrl = photos[0] ? photos[0] : "room1.jpg";
    return (
        <>
            <Container>
                <LeftContainer>
                    <RowContainer>
                        <H2Name>{props.room.number}</H2Name>
                    </RowContainer>
                    <RowContainer>
                        <H2Name2>Цена за ночь:</H2Name2>
                        <H2Name>{props.room.price} ₽</H2Name>
                    </RowContainer>
                    <RowContainer>
                        <PeopleAltIcon sx={{ fontSize: 30 }} />
                        <H2Name2>{props.room.bedAmount}</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <LocalHotelIcon sx={{ fontSize: 30 }} />
                        <H2Name2>{props.room.category}</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <Restaurant sx={{ fontSize: 30 }} />
                        <H2Name2>Питание включено</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <Wifi sx={{ fontSize: 30 }} />
                        <H2Name2>Бесплатный Wi-Fi</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <BathroomIcon sx={{ fontSize: 30 }} />
                        <H2Name2>Санузел</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <BookButton
                            onClick={() =>
                                log ? setOpen(true) : navigate("/auth/entry")
                            }
                        >
                            Забронировать
                        </BookButton>
                    </RowContainer>
                </LeftContainer>
                <RightContainer>
                    <Photo src={`/${photoUrl}`} alt="фото комнаты" />
                    <LeftButton onClick={LeftButtonClick} />
                    <RightButton onClick={RightButtonClick} />
                </RightContainer>
            </Container>
            <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                style={{ padding: 0 }}
                open={open}
                onClose={handleClose}
            >
                <HotelReservation
                    {...{
                        hotelId: props.hotelId,
                        roomId: props.room._id,
                        close: handleClose,
                    }}
                />
            </Dialog>
        </>
    );
}

export default HotelRoom;
