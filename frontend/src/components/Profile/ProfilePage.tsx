import { Cash } from "./Cash/Cash";
import { ProfileHeader } from "./ProfileHeader/Header";
interface LoginProps{
    log: boolean,    
}
export function ProfilePage(props: LoginProps){
    return(
        <div>
            {props.log && 
            <ProfileHeader 
                onPersonalDatatCliced={()=>{}}
                onBookingCliced={()=>{}}
                onTicketsCliced={()=>{}}
                onCashCliced={()=>{}}
            />}
            <Cash money={0}/>
        </div>
    )
}