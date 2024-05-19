import { createRoot } from "react-dom/client";

import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import axios, { type CreateAxiosDefaults } from "axios";

import { store } from "./store/store";

import { Network } from "samolet-common";

import "./index.css";
import { MainRouter } from "./routers/MainRouter";

const axiosConfig: CreateAxiosDefaults = { baseURL: "/api" };

export const network = new Network(config =>
    axios.create({ ...axiosConfig, ...config }),
);

const router = createBrowserRouter(createRoutesFromElements(MainRouter()));

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />);
