import { DefaultHeader } from "./components/Header/DefaultHeader";
import { MainRouter } from "./routers/MainRouter";
import { Container } from "./styleApp";

export function App() {
    return (
        <Container>
            <DefaultHeader />
            <MainRouter />
        </Container>
    );
}
