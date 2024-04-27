import styled from "styled-components"
import {secondaryText} from "./BaseStyle"
import {baseText} from "./BaseStyle"
import {primaryText} from "./BaseStyle"
import {lightPrimary} from "./BaseStyle"
export interface HeaderProps{
    login: boolean,
    onTicketClicked: ()=>void,
    onHotelClicked: ()=>void,
    onRoutClicked: ()=>void,
    onProfileClicked: (login:boolean)=>void,
}   
export function Header(props: HeaderProps){
    return(
        <Container>
            <ContainerIco>                    
                    <Ico 
                        src='hippopotamus.ico'
                        alt='hippopotamus'
                    />
                    <PName>samoleti-begemoti</PName>
            </ContainerIco>
            <ContainerCenter>
                <Button onClick={()=>props.onTicketClicked()}>Отели</Button>
                <Button onClick={()=>props.onHotelClicked()}>Билеты</Button>
                <Button onClick={()=>props.onRoutClicked()}>Маршруты</Button>
            </ContainerCenter>
            <ContainerProfile >
               {props.login ?
                (<Profile 
                    src='key.ico'
                    alt='key'
                    onClick={()=>props.onProfileClicked(props.login)}
                />):
                (<Profile
                    src='profile.ico'
                    alt='profile'
                    onClick={()=>props.onProfileClicked(props.login)}
                />)
                }
            </ContainerProfile>
        </Container>
    )
}
const Ico = styled.img`
    width: 71px;
    height: 71px;
    background-color: rgba(0, 0, 0 , 0 );
`
const PName = styled.h2`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    padding-left: 0.2em;
`
const Button = styled.button`
    ${primaryText}
    ${baseText}    
    font-size: 24px;
    border: 0px;    
    background-color: rgba(0, 0, 0 , 0 );
    margin-left: 1em;
    margin-right: 1em;
`
const Container = styled.div`
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
const ContainerIco = styled.div`
    display: flex;  
    justify-content: flex-start ;    
    align-items: center;
    
`
const ContainerCenter = styled.div`
    display: flex;  
    justify-content: flex-center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin:auto;
    align-items: center;
    
`
const ContainerProfile = styled.div`      
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 20%;

`
const Profile = styled.img`
    width: 45px;
    height: 45px;   
    background-color: rgba(0, 0, 0 , 0 );
`
