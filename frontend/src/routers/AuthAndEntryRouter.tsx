import { Route, Routes } from "react-router";
import { AuthPage } from "../pages/AuthPage";
import { Entry } from "../components/Auth/Entry/Entry";

export function AuthAndEntryRouter() {
    return (
        <>
            <Routes>
                <Route path="auth" element={<AuthPage />} />
                <Route path="entry" element={<Entry />} />
            </Routes>
        </>
    );
}
