import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios, { type CreateAxiosDefaults } from "axios";

import { store } from "./store/store";
import { MainRouter } from "./routers/MainRouter";

import { Network } from "samolet-common";

import "./index.css";

const axiosConfig: CreateAxiosDefaults = { baseURL: "/api" };

export const network = new Network(config =>
    axios.create({ ...axiosConfig, ...config }),
);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainRouter />
            </BrowserRouter>
        </Provider>
    );
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />);
