import { Routes, Route } from "react-router";
import { MainPage } from "../pages/MainPage";
import { AuthPage } from "../pages/AuthPage";
import { TestPage } from "../pages/TestPage";
import { AdminRoutes } from "./AdminRouter";

export function MainRouter() {
    return [
        <Route path="/" element={<MainPage />} />,
        <Route path="/auth" element={<AuthPage />} />,
        <Route path="/test" element={<TestPage />} />,
        <Route path="/admin" children={AdminRoutes()} />,
    ];
}
