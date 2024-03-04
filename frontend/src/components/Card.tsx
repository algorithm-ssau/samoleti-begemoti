
interface CardProps {
    title: string,
    description?: string,
    id: string,
    onClick: (id: string) => void,
}

export function Card(props: CardProps) {
    return (<div onClick={() => props.onClick(props.id)}>
        <h3>{props.title}</h3>
        <p>{ props.description} </p>
    </div>)
}
interface CardHotels {
    title: string,
    description?: string,
    id: string,
    city: CITIES,
    price: number,
    adress: string,
    peopleInRoom: string[],
    onHotelClicked: (id: string) => void,
}
export enum CITIES{
    SAMARA = "Самара",
    MOSCOW = "Москва",
    SAINT_PETERBSBURG = "Санкт-Петербург",
    VLADIVOSTOK = "Владивосток",
    SAKHALIN ="Сахалин"
}
export let hotels:CardHotels[]= [
    {title :"Первый", id :"Первый", city :CITIES.MOSCOW, price : 3200, adress: 'Планета Земля', peopleInRoom : ['2- ', '3- '], onHotelClicked: (text) => alert(text) },
    {title :"Второй", id :"Второй", city :CITIES.SAMARA, price : 1200, adress: 'Планета Земля', peopleInRoom : ['2- ', '3- ', '4- '], onHotelClicked: (text) => alert(text)},
    {title :"Третий", id :"Третий", city :CITIES.SAINT_PETERBSBURG, price : 2200, adress: 'Планета Земля', peopleInRoom : ['1- '], onHotelClicked: (text) => alert(text) },
    {title :"Четвертый", id :"Четвертый", city :CITIES.MOSCOW, price : 4200, adress: 'Планета Земля', peopleInRoom : ['1- ', '2- ', '3- '], onHotelClicked: (text) => alert(text) },
    {title :"Пятый", id :"Пятый", city :CITIES.SAMARA, price : 3200, adress: 'Планета Земля', peopleInRoom : ['2- ', '3- '], onHotelClicked: (text) => alert(text)},
    {title :"Шестой", id :"Шестой", city :CITIES.MOSCOW, price : 1000, adress: 'Планета Земля', peopleInRoom : ['1- ', '2- ', '3- ', '4- '], onHotelClicked: (text) => alert(text) },
    {title :"Седьмой", id :"Седьмой", city :CITIES.MOSCOW, price : 5200, adress: 'Планета Земля', peopleInRoom : ['1- ', '2- '], onHotelClicked: (text) => alert(text) }
]
export function GetHotels(cityprop: CITIES): CardHotels[]{
    let res_hotels: CardHotels[] = [];
    for (let i = 0; i< hotels.length; i++){
        if(cityprop===hotels[i]!.city){
            res_hotels.push(hotels[i]!);
        }
    }
    return res_hotels;
}
export function CardH(props: CardHotels) {
    return (<div className="cardHotel" onClick={() => props.onHotelClicked(props.id)}>
        <img className="img"
                src='home.jpg' 
                alt="Домик"                
        />
        <div className="info">
            <h3>{props.title}</h3>
            <p>Город: { props.city} </p>
            <p>Адрес: {props.adress}</p>
            <p>Минимальная цена за ночь: {props.price}</p>
            <p>Условия: {props.peopleInRoom} местные номера</p>
        </div>
    </div>)
}

export function PrintHotels(cityprop: CITIES){
    let hotels = GetHotels(cityprop);
    let res_hotels = [];
    for (let i=0; i < hotels.length; i++){
        res_hotels.push(CardH(hotels[i]!));
        } 
    return <div className="containerHotels">
        {res_hotels}
    </div> ;
}