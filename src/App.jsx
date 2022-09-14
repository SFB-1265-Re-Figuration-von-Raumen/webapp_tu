import { ThemeProvider } from "@mui/material";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import theme from "./Themes";

function App() {
  return (
    <div className="appContainer">
      <ThemeProvider theme={theme}>
        <KonvaCanvas />
      </ThemeProvider>
    </div>
  );
}

export default App;
