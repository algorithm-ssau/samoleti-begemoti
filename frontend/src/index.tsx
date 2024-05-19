import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios, { type CreateAxiosDefaults } from "axios";

import { store } from "./store/store";

import { Network } from "samolet-common";

import "./index.css";
import { App } from "./App";

const axiosConfig: CreateAxiosDefaults = { baseURL: "/api" };

export const network = new Network(config =>
    axios.create({ ...axiosConfig, ...config }),
);

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
