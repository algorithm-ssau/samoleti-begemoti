import { Route, Routes } from "react-router";
import { Cash } from "../components/Profile/Cash/Cash";
import { Booking } from "../components/Profile/Booking/Booking";

export function ProfileRouter() {
    return (
        <>
            <Routes>
                <Route path="cash" element={<Cash money={100000} />} />
                <Route path="booking" element={<Booking />} />
            </Routes>
        </>
    );
}
