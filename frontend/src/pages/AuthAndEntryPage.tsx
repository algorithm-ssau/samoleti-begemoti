import { DefaultHeader } from "../components/Auth/DefaultHeader";
import { AuthAndEntryRouter } from "../routers/AuthAndEntryRouter";

export function AuthAndEntryPage() {
    return (
        <div>
            <DefaultHeader />
            <AuthAndEntryRouter />
        </div>
    );
}
