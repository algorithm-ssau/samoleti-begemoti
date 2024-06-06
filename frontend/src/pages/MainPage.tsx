import EnterProfile from "../components/EnterProfile";
import styled from "styled-components";

export const Main = styled.div`
    font-size: 50px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    height: 5rem;
    padding-top: 10%;
    padding-bottom: 15%;
`;
export function MainPage() {
    return (
        <div>
            <Main>Добро пожаловать!</Main>
            {/* <EnterProfile /> */}
        </div>
    );
}
