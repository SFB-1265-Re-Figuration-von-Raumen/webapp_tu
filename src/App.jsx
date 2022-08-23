import { useState } from "react";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import Iconbar from "./components/Iconbar";

function App() {
  const [image, setImage] = useState("")
  return (
    <div className="appContainer">

      <KonvaCanvas />

    </div>
  );
}

export default App;
