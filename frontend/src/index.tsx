import { createRoot } from "react-dom/client";

import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";

import { actions, store } from "./store/store";

import "./index.css";
import { MainRouter } from "./routers/MainRouter";
import { network } from "./network";

const router = createBrowserRouter(createRoutesFromElements(MainRouter()));

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}
let token = localStorage.getItem("token");
if (token) {
    network.setToken(token);
    store.dispatch(actions.setLogin(true));
}
let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />);
