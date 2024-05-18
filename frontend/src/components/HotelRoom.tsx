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

function HotelRoom() {
    const roomName = "Название комнаты"; // получаем из бд
    const roomPrice = 2700; // получаем из бд
    return (
        <>
            <Container>
                <LeftContainer>
                    <RowContainer>
                        <H2Name>{roomName}</H2Name>
                    </RowContainer>
                    <RowContainer>
                        <H2Name2>Цена за ночь:</H2Name2>
                        <H2Name>{roomPrice} ₽</H2Name>
                    </RowContainer>
                    <RowContainer>
                        <Icon src="" />
                        <H2Name2>Вмещает мало людей</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <Icon src="" />
                        <H2Name2>Тип и количество кроватей</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <Icon src="" />
                        <H2Name2>Питание включено</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <Icon src="" />
                        <H2Name2>Бесплатный Wi-Fi</H2Name2>
                    </RowContainer>
                    <RowContainer>
                        <Icon src="" />
                        <H2Name2>Санузел</H2Name2>
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
        </>
    );
}

export default HotelRoom;
