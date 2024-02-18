import { createRoot } from "react-dom/client";
import { test } from "./data";
import { Card } from "./components/Card";

function App() {
    let x: number = 1;
    console.log(test())
    console.log(x);
    return <div className="color">
        <Card 
           title="Да не умер"
           id="да не умер он"
           description="он в конце драйва" 
           onClick={ (text) => alert(text) }
        />
    </div>
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />)