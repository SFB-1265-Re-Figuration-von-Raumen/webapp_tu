import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  return (
    <div className="appContainer">
      <ThemeSelector />
      <KonvaCanvas />
    </div>
  );
}

export default App;
