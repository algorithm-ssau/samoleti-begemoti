import AddReview from "../components/AddReview";
import { City, HotelList } from "../components/Card";
import EnterProfile from "../components/EnterProfile";
import HotelReservation from "../components/HotelReservation";
import HotelRoom from "../components/HotelRoom";
import { PlacePicker, type DataType } from "../components/PlacePicker";
import RegistrationSuccess from "../components/RegistrationSuccess";
import RoomReview from "../components/RoomReview";

function onSubmitHandle(data: DataType) {
    console.log(
        data.place + " " + data.date + " " + data.hours + ":" + data.minutes,
    );
}
export function TestPage() {
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
    return (
        <>
            <HotelRoom />
            <HotelReservation />
            <RoomReview />
            <AddReview />
            <RegistrationSuccess
                mainMessage="ура"
                secondaryMessage="регистрация успешно"
            />
            <EnterProfile />
            <HotelList city={City.Moscow} />
            <PlacePicker
                onSubmit={onSubmitHandle}
                listOfPlaces={listOfPlaces}
            />
        </>
    );
}
