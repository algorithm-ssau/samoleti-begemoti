import { createRoot } from "react-dom/client";

function App() {
    let x: number = 1;
    let y: string = "";
    console.log(x);
    return <div className="color">hey</div>
}

let container = document.getElementById("root");
let root = createRoot(container!);
root.render(<App />)