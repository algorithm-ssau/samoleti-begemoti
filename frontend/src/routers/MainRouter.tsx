import { Route, Outlet } from "react-router";
import { MainPage } from "../pages/MainPage";
import { HotelPage } from "../pages/HotelPage";
import { TestPage } from "../pages/TestPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AuthAndEntryPage } from "../pages/AuthAndEntryPage";
import { DefaultHeader } from "../components/Header/DefaultHeader";

export function Layout() {
    return (
        <>
            <DefaultHeader />
            <Outlet />
        </>
    );
}

export function MainRouter() {
    return (
        <>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth/*" element={<AuthAndEntryPage />} />
                <Route path="hotel" element={<HotelPage id={0} />} />
                <Route path="test" element={<TestPage />} />
                <Route
                    path="profile/*"
                    element={<ProfilePage log={true} />}
                ></Route>
            </Route>
        </>
    );
}
