import AddReview from "../components/AddReview";
import { HotelList, City } from "../components/Card";
import EnterProfile from "../components/EnterProfile";
import { HotelPage } from "./HotelPage";
import HotelReservation from "../components/HotelReservation";
import HotelRoom from "../components/HotelRoom";
import { PlacePicker, type DataType } from "../components/PlacePicker";
import RegistrationSuccess from "../components/RegistrationSuccess";
import RoomReview from "../components/RoomReview";
import styled from "styled-components";

const listOfPlaces = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
];

function onSubmitHandle(data: DataType) {
    console.log(
        data.place + " " + data.date + " " + data.hours + ":" + data.minutes,
    );
}

interface Props {}
export const Main = styled.div`
    font-size: 50px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    height: 5rem;
    padding-top: 10%;
    padding-bottom: 15%;
`;
export function MainPage(props: Props) {
    return (
        <div>
            <Main>Добро пожаловать!</Main>
            <RoomReview />
            <AddReview />
            {/* <RegistrationSuccess /> */}
            <EnterProfile />
        </div>
    );
}
