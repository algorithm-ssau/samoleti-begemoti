import { createRoot } from "react-dom/client";

import {
    BrowserRouter,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import axios, { type CreateAxiosDefaults } from "axios";

import { Network } from "samolet-common/dist/src/network/auth";
import { store } from "./store/store";
import { MainRouter } from "./routers/MainRouter";

import "./index.css";

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
