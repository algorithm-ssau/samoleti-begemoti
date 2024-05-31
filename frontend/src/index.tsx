import { createRoot } from "react-dom/client";

import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import axios, { type CreateAxiosDefaults } from "axios";

import { actions, store, useAppDispatch } from "./store/store";

import { Network } from "samolet-common";

import "./index.css";
import { MainRouter } from "./routers/MainRouter";
import { useEffect } from "react";

const axiosConfig: CreateAxiosDefaults = { baseURL: "/api" };

export const network = new Network(config =>
    axios.create({ ...axiosConfig, ...config }),
);

const router = createBrowserRouter(createRoutesFromElements(MainRouter()));

function App() {
    let token = localStorage.getItem("token");
    console.log(token);
    useEffect(() => {
        if (token) {
            const dispatch = useAppDispatch();
            network.setToken(token);
            dispatch(actions.setLogin(true));
        }
    }, [token]);

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />);
