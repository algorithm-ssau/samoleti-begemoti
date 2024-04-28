import { Button, Container } from "./style";
interface ProfileHeaderProps{
    onPersonalDatatCliced: ()=>void,
    onBookingCliced: ()=>void,
    onTicketsCliced: ()=>void,
    onCashCliced: ()=>void,
}

export function ProfileHeader( props: ProfileHeaderProps){
    return(
        <Container>
            <Button onClick={()=>props.onPersonalDatatCliced()}>Личнные данные</Button>
            <Button onClick={()=>props.onBookingCliced()}>Бронь</Button>
            <Button onClick={()=>props.onTicketsCliced()}>Билеты</Button>
            <Button onClick={()=>props.onCashCliced()}>Кошелек</Button>            
        </Container>
    )
}