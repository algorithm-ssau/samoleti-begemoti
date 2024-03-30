import { createRoot } from "react-dom/client";
import { City } from "./components/Card";
import { HotelList } from "./components/Card";
import { PlacePicker } from "./components/PlacePicker";
import type {DataType} from "./components/PlacePicker";
import { Header } from "./components/Header";
import { HotelPage } from "./components/HotelPage";
import './index.css';

function onSubmitHandle (data: DataType) {
   console.log(data.place + ' ' + data.date + ' '+data.hours + ':' + data.minutes)
}

function App() {
   const listOfPlaces = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
   
     return (
     <div>
         <Header login={false} onHotelClicked ={()=> alert("Здесь будет страница поиска билетов")} 
         onTicketClicked = {()=> alert("Здесь будет страница поиска отелей")} 
         onRoutClicked = {()=> alert("Здесь будет страница построения маршрутов")} 
         onProfileClicked = {(profile) => profile ? (alert("Здесь будет страница профиля"))
         :(alert("Здесь будет страница Авторизации/регистрации"))}/>
         <HotelPage id = {0} />
         <HotelList city={City.Moscow} />
         <PlacePicker onSubmit = {onSubmitHandle} listOfPlaces= {listOfPlaces}/>
        
     </div>
     );
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />)
