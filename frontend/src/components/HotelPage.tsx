import type {HotelInfoProps} from "./Hotel";
import {HotelInfoCard} from "./Hotel";

export function getHotel(id:number):HotelInfo{
   
    return {info: hotelInfo.find(aHotel=>aHotel.id===id)!};
}
interface HotelInfo{
    info: HotelInfoProps,
}
interface IdProps{
    id: number,

}
export function HotelPage(props: IdProps){
    let hotel = getHotel(props.id);
    return(
        <HotelInfoCard {...hotel.info}/>
    );
}

export let hotelInfo: HotelInfoProps[] = [
    { name: "ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ",    
        id: 0,
        aboutHotel: "Alas, study of useful practices becomes extremely important for The Framework of Useful Ground "+
        "Noble Vandyke in The Book of the Crucial Component"+        
        "By some means, there is a direct relation between the individual elements and the framework of the integration prospects."+
        " However, in terms of the strategic management seems to be suitable for the major area of expertise on a modern economy.  "+
        "As a matter of fact the layout of the commitment to quality assurance is globally considerable. However, a number of the "+
        "integrated collection of software engineering standards comprehensively illustrates the utter importance of the questionable thesis."+  
        "Resulting from review or analysis of threats and opportunities, we can presume that the possibility of achieving a broad understanding "+
        "of the tasks priority management, as far as the project architecture is questionable, should keep its influence over the "+
        "effective mechanism. The effective time management turns it into something easily real."+
        "Alas, study of useful practices becomes extremely important for The Framework of Useful Ground "+
        "Noble Vandyke in The Book of the Crucial Component"+        
        "By some means, there is a direct relation between the individual elements and the framework of the integration prospects."+
        " However, in terms of the strategic management seems to be suitable for the major area of expertise on a modern economy.  "+
        "As a matter of fact the layout of the commitment to quality assurance is globally considerable. However, a number of the "+
        "integrated collection of software engineering standards comprehensively illustrates the utter importance of the questionable thesis."+  
        "Resulting from review or analysis of threats and opportunities, we can presume that the possibility of achieving a broad understanding "+
        "of the tasks priority management, as far as the project architecture is questionable, should keep its influence over the "+
        "effective mechanism. The effective time management turns it into something easily real.",
        address: "1009 Beachwood Pkwy, Phoenix, Arizona, 27529",
        rating: 5.5,
        parking: true,
        nutrition: true,
        wifi: true,
        link: "https://ssau.ru/",
        onHotelClicked: (text)=> alert(text)},
    { name: "ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ 2",    
        id:1,
        aboutHotel: "Alas, study of useful practices becomes extremely important for The Framework of Useful Ground "+
        "Noble Vandyke in The Book of the Crucial Component"+        
        "By some means, there is a direct relation between the individual elements and the framework of the integration prospects."+
        " However, in terms of the strategic management seems to be suitable for the major area of expertise on a modern economy.  "+
        "As a matter of fact the layout of the commitment to quality assurance is globally considerable. However, a number of the "+
        "integrated collection of software engineering standards comprehensively illustrates the utter importance of the questionable thesis."+  
        "Resulting from review or analysis of threats and opportunities, we can presume that the possibility of achieving a broad understanding "+
        "of the tasks priority management, as far as the project architecture is questionable, should keep its influence over the "+
        "effective mechanism. The effective time management turns it into something easily real.",
        address: "1009 Beachwood Pkwy, Phoenix, Arizona, 27529",
        rating: 7.5,
        parking: true,
        nutrition: false,
        wifi: true,
        link: "https://ssau.ru/",
        onHotelClicked: (text)=> alert(text)}
]
