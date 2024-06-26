import styled from "styled-components";
import { background, accent, primary, primaryText } from "../../BaseStyle";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const Button = styled.button`
    font-size: 1.5em;
    background-color: ${background};
    border: 0;
    border-top: 2px solid #757575;
    margin-bottom: 2%;
    padding: 1%;
    width: 20rem;
    height: 5rem;
    ${primaryText}
    &:hover {
        border: 0.05em solid ${accent};
        border-top: 2px solid ${accent};
    }
    &:active {
        border: 0.05em solid ${primary};
        border-top: 2px solid ${primary};
    }
`;
