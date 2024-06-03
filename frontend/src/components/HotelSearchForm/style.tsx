import styled from "@emotion/styled";
import {
    lightPrimary,
    primaryText,
    baseText,
    accent,
    secondaryText,
} from "../BaseStyle";

export const Container = styled.div`
    background-color: ${lightPrimary};
    display: block;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 48%;
    margin: auto;
    align-items: center;
    border-radius: 8px;
    margin-top: 5%;
`;
export const ContainerUp = styled.div`
    width: 100%;
    display: flex;
    padding-top: 4%;
`;

export const ContainerLeftHalf = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`;
export const HeadingsContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    margin-left: 0%;
    padding-left: 0%;
`;

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-evenly;
    margin-left: 4%;
`;

export const ContainerRightHalf = styled.div`
    width: 35%;
    margin: auto;
    display: flex;
    justify-content: center;
    margin-left: 0%;
`;
export const ContainerDown = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 3%;
    padding-bottom: 4%;
`;
export const H2Headings = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 18px;
    margin: 0%;
    margin-left: 0%;
`;
export const H2Filters = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 17px;
    margin: 0%;
    margin-top: 2px;
    margin-right: 5%;
    text-align: center;
`;
export const Checkbox = styled.input`
    width: 21px;
    height: 21px;
    accent-color: ${accent};
    cursor: pointer;
`;

export const FindButton = styled.button`
    color: white;
    ${baseText}
    font-size: 18px;
    display: block;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 30px;
    border: 0px;
    box-shadow: 0px 2px 4px ${lightPrimary};
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 3%;
    padding-right: 3%;
`;
export const DataPriceInput = styled.input`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    width: 130px;
    border: 0px;
    cursor: pointer;
    margin: 0%;
    margin-top: 10%;
    margin-bottom: 10%;
    box-shadow: 0px 5px 5px ${lightPrimary};
`;

export const CustomSelect = styled.select`
    color: #3c3c43;
    ${baseText}
    font-size: 18px;
    border: none;
    box-shadow: 0px 5px 5px ${lightPrimary};
    margin: 0%;
    margin-top: 10%;
    margin-bottom: 10%;
    padding-top: 0%;
    padding-bottom: 0%;
    padding-left: 3%;
    cursor: pointer;
`;
