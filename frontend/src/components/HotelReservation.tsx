import styled from "styled-components";
import {
    lightPrimary,
    primaryText,
    secondaryText,
    baseText,
} from "./BaseStyle";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, userThunks } from "../store/store";
import type { BookingRequest } from "samolet-common";

const Container = styled.div`
    display: block;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 75%;
    margin: auto;
    border-radius: 30px;
    padding-bottom: 1%;
`;
const CloseButton = styled.button`
    width: 25px;
    height: 25px;
    margin-right: 10%;
    margin-left: 90%;
    margin-top: 5%;
    margin-bottom: 2%;
    padding: 0px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    float: left;
`;
const ButtonContainer = styled.div`
    height: 10%;
    margin-bottom: 5%;
`;
const UpContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const MiddleContainer = styled.div`
    width: 100%;
    margin-top: 10%;
`;
const RowContainer = styled.div`
    width: 100%;
    display: block;
    margin-left: 15%;
    margin-bottom: 5%;
`;
const RowContainer2 = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 5%;
`;
const RowContainer2Left = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 13%;
    margin-top: 3%;
    padding-right: 3%;
`;
const RowContainer2Right = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    justify-content: space-evenly;
    align-items: center;
    padding-left: 0%;
`;
const DownContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const TextArea = styled.textarea`
    margin-left: 0%;
    width: 70%;
    height: 60px;
    border: 0px;
    ${baseText}
    font-size: 16px;
    resize: none;
    box-shadow: 0px 5px 5px ${lightPrimary};
    padding-bottom: 5%;
`;
const H2Name = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 18px;
    text-align: left;
    margin-top: 0%;
    margin-bottom: 5%;
`;
const PayAndBookButton = styled.button`
    color: white;
    ${baseText}
    font-size: 24px;
    display: block;
    text-align: center;
    vertical-align: middle;
    background-color: ${lightPrimary};
    box-shadow: 0px 2px 4px ${lightPrimary};
    margin: auto;
    margin-bottom: 3%;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 5%;
    padding-right: 5%;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;
`;
const SelectRoom = styled.select`
    color: #4a4848;
    ${baseText}
    font-size: 24px;
    background-color: rgb(230, 230, 230);
    box-shadow: 0px 5px 5px silver;
    border-radius: 30px;
    border: none;
    padding-top: 2%;
    padding-bottom: 1%;
    padding-left: 5%;
    padding-right: 20%;
    cursor: pointer;
`;
const SelectGuestAmount = styled.select`
    color: #3c3c43;
    ${baseText}
    font-size: 18px;
    border: none;
    box-shadow: 0px 5px 5px ${lightPrimary};
    margin-left: 2%;
    padding-top: 0%;
    padding-bottom: 0%;
    padding-left: 3%;
    padding-right: 5%;
    cursor: pointer;
`;
const ChooseDate = styled.input`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    border: 0px;
    cursor: pointer;
    box-shadow: 0px 5px 5px ${lightPrimary};
`;
type InputEvent = React.ChangeEvent<HTMLInputElement>;
function ClosedButton() {
    alert("Closed Button was pressed");
}

function PayButton() {
    alert("Pay Button was pressed");
}

function BookButton() {
    alert("Book Button was pressed");
}
interface Prpos {
    hotelId: string;
    roomId: string;
    close: () => void;
}

function HotelReservation(props: Prpos) {
    const dispatch = useAppDispatch();
    const roomTypes = ["one", "two", "three", "four", "five"];
    const rooms = roomTypes.map(item => <option key={item}>{item}</option>);
    const guestAmount = [1, 2, 3, 4, 5, 6, 7, 8];
    const guests = guestAmount.map(item => <option key={item}>{item}</option>);
    const [roomTypesSelected, setRoomTypesSelected] = useState("one");
    const [dateFrom, setDateFrom] = useState("0");
    const [dateTo, setDateTo] = useState("0");
    const [comment, setComment] = useState("");
    console.log(dateFrom);
    const [guestAmountSelected, setGuestAmount] = useState("");
    const booking = useAppSelector(state => state.requests.book);
    const onBook = () => {
        dispatch(
            userThunks.book({
                hotelId: props.hotelId,
                roomId: props.roomId,
                dateFrom: new Date(dateFrom).valueOf(),
                dateTo: new Date(dateTo).valueOf(),
                roomType: roomTypesSelected,
                comment: comment,
                guestAmount: guestAmountSelected,
            } as BookingRequest),
        );
    };

    return (
        <Container>
            <ButtonContainer>
                <CloseButton onClick={() => props.close()}>✖</CloseButton>
            </ButtonContainer>
            <UpContainer>
                <SelectRoom
                    onChange={e => setRoomTypesSelected(e.target.value)}
                >
                    <option value="" selected disabled hidden>
                        Тип комнаты
                    </option>
                    {rooms}
                </SelectRoom>
            </UpContainer>
            <MiddleContainer>
                <RowContainer>
                    <H2Name>
                        Количество гостей:
                        <SelectGuestAmount
                            onChange={e => setGuestAmount(e.target.value)}
                        >
                            <option value="" selected disabled hidden>
                                --
                            </option>
                            {guests}
                        </SelectGuestAmount>
                    </H2Name>
                </RowContainer>
                <RowContainer>
                    <H2Name>Выбор даты:</H2Name>
                </RowContainer>
                <RowContainer2>
                    <RowContainer2Left>
                        <H2Name>с</H2Name>
                        <H2Name>по</H2Name>
                    </RowContainer2Left>
                    <RowContainer2Right>
                        <ChooseDate
                            type="date"
                            onChange={e => setDateFrom(e.target.value)}
                        />
                        <ChooseDate
                            type="date"
                            onChange={e => setDateTo(e.target.value)}
                        />
                    </RowContainer2Right>
                </RowContainer2>
                <RowContainer>
                    <TextArea
                        placeholder="Комментарий к брони"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </RowContainer>
            </MiddleContainer>
            <DownContainer>
                <H2Name>Итого к оплате:</H2Name>
                <H2Name>Много</H2Name>
                <PayAndBookButton onClick={PayButton}>
                    Оплатить
                </PayAndBookButton>
                <PayAndBookButton onClick={() => onBook()}>
                    Бронировать
                </PayAndBookButton>
            </DownContainer>
        </Container>
    );
}

export default HotelReservation;
