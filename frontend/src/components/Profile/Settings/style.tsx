import styled from "styled-components";
import { lightPrimary } from "../../BaseStyle";
import { Base } from "../Cash/style";

export const ProfileButton = styled.button`
    ${Base};
    display: flex;
    align-items: center;
    padding: 2%%;
    border: 0;
    border-radius: 10em;
    width: 10rem;
    font-size: 1.125rem;
    height: 2.25rem;
    justify-content: center;
    background-color: ${lightPrimary};
    margin: 2% auto;
`;
