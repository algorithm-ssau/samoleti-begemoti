import { createRoot } from "react-dom/client";

import type { DataType } from "./components/PlacePicker";
import "./index.css";
import { City } from "./components/Card";
import { HotelList } from "./components/Card";
import { PlacePicker } from "./components/PlacePicker";
import { HotelPage } from "./components/HotelPage";
import { Header } from "./components/Header/Header";
import AddReview from "./components/AddReview";
import EnterProfile from "./components/EnterProfile";
import RoomReview from "./components/RoomReview";
import HotelReservation from "./components/HotelReservation";
import HotelRoom from "./components/HotelRoom";

import HotelCard from "./components/HotelCard";
import SearchHotel from "./components/SearchHotel";
import { AddHotel } from "./components/AddHotel/AddHotel";

function onSubmitHandle(data: DataType) {
    console.log(
        data.place + " " + data.date + " " + data.hours + ":" + data.minutes,
    );
}

function App() {
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
        <div>
            <AddHotel />
            <Header
                login={false}
                onTicketClicked={() => {}}
                onHotelClicked={() => {}}
                onRoutClicked={() => {}}
                onProfileClicked={() => {}}
            />

            <HotelRoom />
            <HotelReservation />
            <RoomReview />
            <AddReview />
            {/* <RegistrationSuccess/> */}
            <EnterProfile />
            <SearchHotel />
            <HotelCard />
            <HotelPage id={0} />
            <HotelList city={City.Moscow} />
            <PlacePicker
                onSubmit={onSubmitHandle}
                listOfPlaces={listOfPlaces}
            />
        </div>
    );
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />);
