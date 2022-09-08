import { useState } from "react";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";

function App() {
  return (
    <div className="appContainer">
      <KonvaCanvas />
    </div>
  );
}

export default App;
