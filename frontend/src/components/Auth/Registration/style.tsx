import styled from "styled-components";
import { baseText, lightPrimary, primaryText } from "../../BaseStyle";

export const Container = styled.div`
    width: 40%;
    margin: 5% auto;
    font-size: 1.25rem;
`;
export const Row = styled.div`
    display: flex;
    margin: 4% 2%;
`;
export const Block = styled.div`
    display: flex;
    flex-direction: column;
`;
export const PasswordCheck = styled.div`
    margin: 1% 0 1% auto;
`;
export const Input = styled.input`
    width: 10rem;
    margin: 1% 0% 1% auto;
    box-shadow: 0px 2px 4px ${lightPrimary};
    border: 0px;
    font-size: 1.25rem;
`;
export const Button = styled.button`
    height: 30px;
    ${baseText}
    ${primaryText}
    font-size: 1.25rem;
    border: none;
    margin: 2% auto;
    padding: auto 2%;
    background-color: white;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0px 2px 4px ${lightPrimary};
`;
