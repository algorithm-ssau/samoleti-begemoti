import { createRoot } from "react-dom/client";
import "./index.css";
import { HotelPage } from "./components/HotelPage";
import { ProfilePage } from "./components/Profile/ProfilePage";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./routes/component/NotFoundPage";
import { TestPage } from "./components/TestPage";
function App() {
    return (
        <div>
            <BrowserRouter>
                <Header
                    login={false}
                    onTicketClicked={() => {}}
                    onHotelClicked={() => {}}
                    onRoutClicked={() => {}}
                    onProfileClicked={() => {}}
                />
                <Routes>
                    <Route path="/" element={<ProfilePage log={true} />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="hotel" element={<HotelPage id={0} />} />
                    <Route path="test" element={<TestPage />} />
                    <Route
                        path="profile/*"
                        element={<ProfilePage log={true} />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />);
