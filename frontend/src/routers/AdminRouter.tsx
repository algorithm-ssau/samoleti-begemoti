import { Route } from "react-router";
import { store } from "../store/store";
import { usersThunk } from "../store/requestThunks";
import { UsersPage } from "../pages/admin/UsersPage";
import { AddHotelPage } from "../pages/admin/AddHotelPage";
import { AdminIndexPage } from "../pages/admin/AdminIndexPage";

export function AdminRoutes() {
    return [
        <Route path="" element={<AdminIndexPage />} />,
        <Route
            path="users"
            element={<UsersPage />}
            loader={props => {
                store.dispatch(usersThunk());
                return null;
            }}
        />,
        <Route path="add-hotel" element={<AddHotelPage />} />,
    ];
}
