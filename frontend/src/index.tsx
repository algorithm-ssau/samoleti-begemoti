import { createRoot } from "react-dom/client";
import { test } from "./data";
//import { Card } from "./components/Card";

import { CITIES } from "./components/Card";
//import { CardH } from "./components/Card";
import { PrintHotels } from "./components/Card";
import './index.css';

function App() {
    let x: number = 1;
    console.log(test())
    console.log(x);
    //let print = PrintHotels(CITIES.MOSCOW);

    // return (<div className="color">
    //     <Card 
    //        title="Да не умер"
    //        id="да не умер он"
    //        description="он в конце драйва" 
    //        onClick={ (text) => alert(text) }
    //     />
    // </div>
    // {print}
     return <div>
        {PrintHotels(CITIES.MOSCOW)}

     </div>;
    
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />)