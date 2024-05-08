import { Routes, Route } from "react-router";
import { MainPage } from "../pages/MainPage";
import { AuthPage } from "../pages/AuthPage";

export function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<AuthPage />} />
        </Routes>
    );
}
