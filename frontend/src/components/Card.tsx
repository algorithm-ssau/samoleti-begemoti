interface Hotel{
    title: string,
    description?: string,
    id: string,
    city: City,
    price: number,
    address: string,
    peopleInRoom: string[],
}

interface HotelCardProps {
    hotel: Hotel,
    onHotelClicked: (id: string) => void,
}

export enum City{
    Samara = "Самара",
    Moscow = "Москва",
    SaintPetersburg = "Санкт-Петербург",
    Vladivostok = "Владивосток",
    Sakhalin ="Сахалин"
}

export let hotels : Hotel[]= [ 
    {title :"Первый", id :"Первый", city :City.Moscow, price : 3200, address: 'Планета Земля', peopleInRoom : ['2- ', '3- ']},
    {title :"Второй", id :"Второй", city :City.Samara, price : 1200, address: 'Планета Земля', peopleInRoom : ['2- ', '3- ', '4- ']},
    {title :"Третий", id :"Третий", city :City.SaintPetersburg, price : 2200, address: 'Планета Земля', peopleInRoom : ['1- ']},
    {title :"Четвертый", id :"Четвертый", city :City.Moscow, price : 4200, address: 'Планета Земля', peopleInRoom : ['1- ', '2- ', '3- ']},
    {title :"Пятый", id :"Пятый", city :City.Samara, price : 3200, address: 'Планета Земля', peopleInRoom : ['2- ', '3- ']},
    {title :"Шестой", id :"Шестой", city :City.Moscow, price : 1000, address: 'Планета Земля', peopleInRoom : ['1- ', '2- ', '3- ', '4- ']},
    {title :"Седьмой", id :"Седьмой", city :City.Moscow, price : 5200, address: 'Планета Земля', peopleInRoom : ['1- ', '2- ']}
];

export function getHotels(city: City): Hotel[]{
    let resHotels: Hotel[] = hotels.filter((aHotel)=>aHotel.city===city);
    return resHotels;
}

export function HotelCard(props: HotelCardProps) {
    return (<div className="hotelCard" onClick={() => props.onHotelClicked(props.hotel.id)}>
        <img className="img"
                src='home.jpg' 
                alt="Домик"                
        />
        <div className="info">
            <h3>{props.hotel.title}</h3>
            <p>Город: { props.hotel.city} </p>
            <p>Адрес: {props.hotel.address}</p>
            <p>Минимальная цена за ночь: {props.hotel.price}</p>
            <p>Условия: {props.hotel.peopleInRoom} местные номера</p>
        </div>
    </div>)
}
interface HotelListProps{
    city: City,
}
export function HotelList(prop: HotelListProps){
    let hotels = getHotels(prop.city);
    let resHotels = hotels.map((aHotel)=> <HotelCard hotel = {aHotel} onHotelClicked = {(text)=> alert(text)}/>);
    return <div className="hotelsContainer">
        {resHotels}
    </div> ;
}