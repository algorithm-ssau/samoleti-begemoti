import { createRoot } from "react-dom/client";
import { City } from "./components/Card";
import { HotelList } from "./components/Card";
import { PlacePicker } from "./components/PlacePicker";
import type {DataType} from "./components/PlacePicker";
import './index.css';

function onSubmitHandle (data: DataType) {
   console.log(data.place + ' ' + data.date + ' '+data.hours + ':' + data.minutes)
}

function App() {
   const listOfPlaces = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
     return (
     <div>
        <HotelList city={City.Moscow} />;
        <PlacePicker onSubmit = {onSubmitHandle} listOfPlaces= {listOfPlaces}/>
     </div>
     );
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />)