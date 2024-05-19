import styled from "styled-components";
import { lightPrimary, primaryText, baseText } from "./BaseStyle";


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
const RowLeft = styled.div `
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
const Icon = styled.img`
    width: 50px;
    height: 50px;
    vertical-align: middle;
    margin: 0%;
    margin-right: 2%;
`;
const StarPic = styled.img`
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin: auto;
`
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

function HotelCard() {
    const hotelName = "Название отеля"; // получаем из бд
    const roomPrice = 2700; // получаем из бд
    return (
        <Container>
            <LeftContainer>
                <RowContainer>
                    <RowLeft>
                        <H2PrimaryColor>{hotelName}</H2PrimaryColor>
                    </RowLeft>
                    <RowRight>
                        <H2SecondaryColor>5,5 <StarPic src=""/> </H2SecondaryColor>
                    </RowRight>
                    
                </RowContainer>
                <RowContainer>
                    <H2SecondaryColor>Цена за ночь:</H2SecondaryColor>
                    <H2PrimaryColor>{roomPrice} ₽</H2PrimaryColor>
                </RowContainer>
                <RowContainer>
                    <Icon src="" />
                    <H2SecondaryColor>Адрес</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <Icon src="" />
                    <H2SecondaryColor>Типы номеров</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <Icon src="" />
                    <H2SecondaryColor>Питание включено</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <Icon src="" />
                    <H2SecondaryColor>Бесплатный Wi-Fi</H2SecondaryColor>
                </RowContainer>
                <RowContainer>
                    <BookButton onClick={BookButtonClick}>
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