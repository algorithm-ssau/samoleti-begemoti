import { Routes, Route } from "react-router";
import { MainPage } from "../pages/MainPage";
import { HotelPage } from "../pages/HotelPage";
import { TestPage } from "../pages/TestPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AuthAndEntryPage } from "../pages/AuthAndEntryPage";

export function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/*" element={<AuthAndEntryPage />} />
            <Route path="hotel" element={<HotelPage id={0} />} />
            <Route path="test" element={<TestPage />} />
            <Route
                path="profile/*"
                element={<ProfilePage log={true} />}
            ></Route>
        </Routes>
    );
}
