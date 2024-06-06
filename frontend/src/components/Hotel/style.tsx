import styled from "styled-components";
import {
    baseText,
    lightPrimary,
    primaryText,
    secondaryText,
} from "../BaseStyle";

export const cardText = `
    color: #4A4848;
`;
export const H1Name = styled.h1`
    ${primaryText}
    ${baseText}
    font-size: 36px;
    weight: 508px;
`;
export const H2Name = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 24px;
`;
export const PName = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
`;
export const Text = styled.p`
    ${primaryText}
    ${baseText}
    font-size: 18px;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 16;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
export const ButtonInf = styled.button`
    ${secondaryText}
    ${baseText}
    font-size: 24px;
    background-color: ${lightPrimary};
    box-shadow: 0px 2px 4px ${lightPrimary};
    border: 0px;
    margin-bottom: 3%;
`;
export const Container = styled.div`
    display: flex;
    padding-left: 3%;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 60%;
    min-width: 350px;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
`;
export const ContainerHalf = styled.div`
    width: 50%;
    height: 100%;
    margin-right: 5%;
`;
export const ContainerRow = styled.div`
    display: flex;
    margin-top: 5%;
    margin-bottom: 5%;
    align-items: center;
`;
export const ContainerRowRight = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 5%;
    margin-bottom: 5%;
    align-items: center;
    height: 20%;
`;
export const ContainerVertical = styled.div`
    height: 65%;
    align-items: center;
`;
export const Ico = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 5%;
    margin-left: 5%;
    background-color: ${lightPrimary};
`;
export const IcoMui = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 5%;
    margin-left: 5%;
`;
export const Link = styled.a`
    text-decoration: none;
    ${secondaryText}
    ${baseText}
    font-size: 18px;
`;
