import { useState } from "react";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";

function App() {
  const [image, setImage] = useState("")
  return (
    <div className="appContainer">
      <KonvaCanvas />
    </div>
  );
}

export default App;
