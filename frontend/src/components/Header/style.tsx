import styled from "styled-components"
import { baseText, lightPrimary, primaryText, secondaryText } from "../BaseStyle"

export const Ico = styled.img`
    width: 71px;
    height: 71px;
    background-color: rgba(0, 0, 0 , 0 );
`
export const PName = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    padding-left: 0.2em;
`
export const Button = styled.button`
    ${primaryText}
    ${baseText}    
    font-size: 24px;
    border: 0px;    
    background-color: rgba(0, 0, 0 , 0 );
    margin-left: 1em;
    margin-right: 1em;
`
export const Container = styled.div`
    display: flex;
    padding-left: 3%;
    padding-right: 3%;
    //box-shadow: 0px 2px 4px ${lightPrimary};
    border-radius: 30px;
    width: 80%;
    height: 86px;  
    margin:auto;  
    margin-top:2%;
    margin-bottom:5%;
    background-color: ${lightPrimary}
`
export const ContainerIco = styled.div`
    display: flex;  
    justify-content: flex-start ;    
    align-items: center;
    
`
export const ContainerCenter = styled.div`
    display: flex;  
    justify-content: flex-center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin:auto;
    align-items: center;
    
`
export const ContainerProfile = styled.div`      
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 20%;

`
export const Profile = styled.img`
    width: 45px;
    height: 45px;   
    background-color: rgba(0, 0, 0 , 0 );
`