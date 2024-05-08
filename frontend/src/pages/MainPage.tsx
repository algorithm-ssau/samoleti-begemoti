import AddReview from "../components/AddReview";
import { HotelList, City } from "../components/Card";
import EnterProfile from "../components/EnterProfile";
import { DefaultHeader } from "../components/Header/DefaultHeader";
import { HotelPage } from "../components/HotelPage";
import HotelReservation from "../components/HotelReservation";
import HotelRoom from "../components/HotelRoom";
import { PlacePicker, type DataType } from "../components/PlacePicker";
import RegistrationSuccess from "../components/RegistrationSuccess";
import RoomReview from "../components/RoomReview";

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

export function MainPage(props: Props) {
    return (
        <div>
            <DefaultHeader />
            <HotelRoom />
            <HotelReservation />
            <RoomReview />
            <AddReview />
            <RegistrationSuccess />
            <EnterProfile />

            <HotelPage id={0} />
            <HotelList city={City.Moscow} />
            <PlacePicker
                onSubmit={onSubmitHandle}
                listOfPlaces={listOfPlaces}
            />
        </div>
    );
}
