import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

import { Network } from "samolet-common/dist/src/network/auth";
import { store } from "./store/store";
import { MainRouter } from "./routers/MainRouter";

import "./index.css";

export const network = new Network(axios.create({ baseURL: "/api" }));

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
