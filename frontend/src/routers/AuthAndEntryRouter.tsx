import { Route, Routes } from "react-router";
import { AuthPage } from "../pages/AuthPage";

export function AuthAndEntryRouter() {
    return (
        <>
            <Routes>
                <Route path="auth" element={<AuthPage />} />
                {/* <Route path="entry" element={< />} /> */}
            </Routes>
        </>
    );
}
