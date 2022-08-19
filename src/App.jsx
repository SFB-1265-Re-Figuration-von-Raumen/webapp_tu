import { useState } from "react";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import Iconbar from "./components/Iconbar";
import Images from "./components/Images";

function App() {
  return (
    <div className="appContainer">
      <Images />
      <KonvaCanvas />
      {/* <NewIconBar /> */}
      <Iconbar />
    </div>
  );
}

export default App;
