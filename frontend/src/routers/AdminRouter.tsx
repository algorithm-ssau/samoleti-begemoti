import { Route, Routes } from "react-router";
import { store, useAppDispatch } from "../store/store";
import { usersThunk } from "../store/requestThunks";
import { UsersPage } from "../pages/admin/UsersPage";
import React from "react";

export function AdminRoutes() {
    return [
        <Route path="" element={<div>admin index</div>} />,
        <Route
            path="users"
            element={<UsersPage />}
            loader={props => {
                store.dispatch(usersThunk());
                return null;
            }}
        />,
    ];
}
