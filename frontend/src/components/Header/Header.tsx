
import { Button, Container, ContainerCenter, Profile, ContainerProfile, ContainerIco, Ico, PName } from "./style";


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
