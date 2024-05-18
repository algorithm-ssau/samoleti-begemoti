import styled from "styled-components";
import {
    accent,
    baseText,
    lightPrimary,
    primaryText,
    secondaryText,
} from "../../BaseStyle";

export const Base = `
    ${baseText} 
    ${primaryText};  
    font-size: 1.5rem;    
    padding: 2% 4%; 
`;
export const Container = styled.div``;
export const ContainerRow = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-around;
    margin: 2% auto;
    padding: 2% 0;
`;
export const ContainerChapter = styled.div`
    display: flex;
    width: 90%;
    justify-content: center;
    margin: 4% auto;
`;
export const Line = styled.div`
    display: inline-block;
    width: 80%;
    height: 0px;
    border: 0px;
    border-bottom: 1px solid ${accent};
    box-shadow: 0px 2px 4px ${accent};
    margin: auto 0;
`;
export const Text = styled.p`
    margin-right: 1%;
    margin-block-start: 0;
    margin-block-end: 0;
    ${baseText}
    ${secondaryText};
    font-size: 1.5rem;
`;
export const Balance = styled.div`
    ${Base}
    background-color: ${lightPrimary};
`;
export const Replenish = styled.button`
    ${Base}
    border:0;
    border-radius: 30em;
    background-color: ${lightPrimary};
`;
export const Money = styled.div`
    ${Base}
`;
export const OperationContaner = styled.div`
    width: 55%;
    margin: 1% auto;
    display: flex;
    justify-content: space-around;
    border-bottom: 0.01em solid ${accent};
    box-shadow: 0em 0.1em 0.2em ${lightPrimary};
`;
export const OperationElement = styled.div`
    display: flex;
    width: 50%;
    justify-content: center;
    ${Base}
`;
