import styled from "styled-components";
import { Background, accent, primary, primaryText } from "../../BaseStyle";

export const Container = styled.div`
    display:flex;
    flex-direction: row;    
    justify-content: center ;  
`
export const Button = styled.button`
    width:20%;
    font-size: 1.5em;
    background-color: ${Background};
    border: 0;
    border-top: 2px solid #757575;
    margin-bottom:2%;
    padding: 1%;
    ${primaryText}
    &:hover{
        border: 0.05em solid ${accent};
        border-top: 2px solid ${accent};  
    }
    &:active{
        border: 0.05em solid ${primary};
        border-top: 2px solid ${primary};  
    }
`
