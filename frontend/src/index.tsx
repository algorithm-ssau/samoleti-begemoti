import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { Network } from "samolet-common/dist/src/network/auth";
import { store } from "./store/store";
import "./index.css";
import { App } from "./App";

export const network = new Network(axios.create({ baseURL: "/api" }));

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
