import { useState } from "react";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import Iconbar from "./components/Iconbar";

function App() {
  return (
    <div className="appContainer">
      <KonvaCanvas />
      <Iconbar />
    </div>
    
  );
}

export default App;
