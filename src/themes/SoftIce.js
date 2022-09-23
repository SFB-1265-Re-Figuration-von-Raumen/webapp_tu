import { createTheme } from "@mui/material";
import "../Fonts.css"

export const theme = createTheme({
    palette: {
        primary: {
            main: "#fff28e",
            dark: "#fff7ba",
            light: "#fffce8",
        },
        secondary: {
            main: "#cccccc",
            // main: "#000000",
        },
    },
    typography: {
        fontFamily: [
            "Space Mono",
            "Arial"
        ].join(","),
    },
});

export default theme