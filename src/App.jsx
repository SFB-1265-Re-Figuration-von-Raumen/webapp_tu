import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import ThemeSelector from "./components/ThemeSelector";
// import theme from "./Themes";

function App() {
  return (
    <div className="appContainer">

      <ThemeSelector />
      <KonvaCanvas />
    </div>
  );
}

export default App;
