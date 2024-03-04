import { createRoot } from "react-dom/client";
import { City } from "./components/Card";
import { HotelList } from "./components/Card";
import './index.css';
function App() {

    
     return <div>
        < HotelList  city={City.Moscow} />;
     </div>;
    
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />)