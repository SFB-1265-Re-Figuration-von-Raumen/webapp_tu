import { useState } from "react";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import NewIconBar from "./components/NewIconBar";
import Iconbar from "./components/Iconbar";

function App() {
  return (
    <div className="appContainer">
      <KonvaCanvas />
      {/* <NewIconBar /> */}
      <Iconbar />
    </div>
    
  );
}

export default App;
