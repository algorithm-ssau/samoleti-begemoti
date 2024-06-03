import styled from "styled-components";
import { lightPrimary, primaryText, baseText } from "./BaseStyle";
import type { Address } from "samolet-common";
import { useNavigate } from "react-router";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Place, Restaurant, Wifi } from "@mui/icons-material";
import ChairIcon from "@mui/icons-material/Chair";

import { purple } from "@mui/material/colors";

const Container = styled.div`
    display: flex;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 62%;
    margin: auto;
    margin-top: 5%;
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
const RowLeft = styled.div`
    width: 75%;
`;

const RowRight = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const H2PrimaryColor = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 36px;
    margin: 2% 2% 2% 0%;
    text-align: left;
`;
const H2SecondaryColor = styled.h2`
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
const StarPic = styled.img`
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin: auto;
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

export interface hotelCardProps {
    name: string;
    price: number;
    address: Address;
    luxary: boolean;
    normal: boolean;
    reallyBad: boolean;
    isFood: boolean;
    isWiFi: boolean;
    raiting: number;
}

function HotelCard(props: hotelCardProps) {
    const foodMessage = props.isFood
        ? "Питание включено"
        : "Питание не включено";
    const wifiMessage = props.isWiFi ? "Бесплатный Wi-Fi" : "Нет интернета";
    let rooms = "";
    const addressMessage =
        props.address.country + props.address.city + props.address.place;
    rooms = props.luxary ? rooms + "Люкс " : rooms + "";
    rooms = props.luxary ? rooms + "Стандарт " : rooms + "";
    rooms = props.luxary ? rooms + "Эконом " : rooms + "";
    const navigate = useNavigate();
    return (
        <Container>
            <LeftContainer>
                <RowContainer>
                    <RowLeft>
                        <H2PrimaryColor>{props.name}</H2PrimaryColor>
                    </RowLeft>
                    <RowRight>
                        <H2SecondaryColor>{props.raiting} </H2SecondaryColor>
                        <StarRateIcon
                            sx={{ fontSize: 40, color: purple["A200"] }}
                        />
                    </RowRight>
                </RowContainer>
                <RowContainer>
                    <H2SecondaryColor>Цена за ночь:</H2SecondaryColor>
                    <H2PrimaryColor>{props.price} ₽</H2PrimaryColor>
                </RowContainer>
                <RowContainer>
                    <Place sx={{ fontSize: 30 }} />
                    <H2SecondaryColor>{addressMessage}</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <ChairIcon sx={{ fontSize: 30 }} />
                    <H2SecondaryColor>{rooms}</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <Restaurant sx={{ fontSize: 30 }} />
                    <H2SecondaryColor>{foodMessage}</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <Wifi sx={{ fontSize: 30 }} />
                    <H2SecondaryColor>{wifiMessage}</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <BookButton
                        onClick={() => {
                            navigate("hotelpage");
                        }}
                    >
                        Забронировать
                    </BookButton>
                </RowContainer>
            </LeftContainer>
            <RightContainer>
                <Photo src="" alt="фото комнаты" />
                <LeftButton onClick={LeftButtonClick} />
                <RightButton onClick={RightButtonClick} />
            </RightContainer>
        </Container>
    );
}

export default HotelCard;
