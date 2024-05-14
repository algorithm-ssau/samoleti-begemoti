import { Routes, Route } from "react-router";
import { MainPage } from "../pages/MainPage";
import { AuthPage } from "../pages/AuthPage";
import { TestPage } from "../pages/TestPage";

export function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    );
}
