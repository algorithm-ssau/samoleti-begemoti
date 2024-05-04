import AddReview from "./AddReview";
import { City, HotelList } from "./Card";
import EnterProfile from "./EnterProfile";
import HotelReservation from "./HotelReservation";
import HotelRoom from "./HotelRoom";
import { PlacePicker, type DataType } from "./PlacePicker";
import RegistrationSuccess from "./RegistrationSuccess";
import RoomReview from "./RoomReview";

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
            <RegistrationSuccess />
            <EnterProfile />
            <HotelList city={City.Moscow} />
            <PlacePicker
                onSubmit={onSubmitHandle}
                listOfPlaces={listOfPlaces}
            />
        </>
    );
}
