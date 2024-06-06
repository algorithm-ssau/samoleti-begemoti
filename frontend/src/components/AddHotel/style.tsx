import styled from "styled-components";
import { lightPrimary, primaryText, baseText } from "../BaseStyle";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 75%;
    min-width: 690px;
    margin: auto;
    margin-left: 12%;
    margin-top: 5%;
    padding-bottom: 2%;
    border-radius: 0px;
    align-items: center;
`;
export const LeftContainer = styled.div`
    width: 50%;
    margin-top: 0%;
    margin-left: 2%;
    padding-right: 2%;
`;

export const RightContainer = styled.div`
    width: 50%;
    margin: 0%;
`;

export const RowContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const H2PrimaryColor = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 18px;
    margin: 2% 2% 2% 0%;
    text-align: left;
`;

export const TextField = styled.input``;

export const InputButton = styled.input``;

export const CustomSelect = styled.select`
    ${primaryText}
    ${baseText}
font-size: 18px;
    cursor: pointer;
    width: 20%;
`;
