import { Route, Outlet } from "react-router";
import { MainPage } from "../pages/MainPage";
import { HotelPage } from "../pages/HotelPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AuthAndEntryPage } from "../pages/AuthAndEntryPage";
import { DefaultHeader } from "../components/Header/DefaultHeader";
import { SearchHotelPage } from "../pages/SearchHotelPage";
import { AdminRoutes } from "./AdminRouter";

export function Layout() {
    return (
        <>
            <DefaultHeader />
            <div style={{ margin: "100px" }}>
                <Outlet />
            </div>
        </>
    );
}

export function MainRouter() {
    return (
        <>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth/*" element={<AuthAndEntryPage />} />
                <Route path="hotel/:id" element={<HotelPage />} />
                <Route path="hotel" element={<SearchHotelPage />} />
                <Route
                    path="profile/*"
                    element={<ProfilePage log={true} />}
                ></Route>
                <Route path="admin">{AdminRoutes()}</Route>
            </Route>
        </>
    );
}
