import { createTheme } from "@mui/material";
import "../Fonts.css"

export const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
            dark: "#ffd1d4",
            light: "#ffffff",
        },
        secondary: {
            main: "#ffdccc",
            // main: "#000000",
        },
    },
    typography: {
        fontFamily: [
            "Ark-Es",
            "Arial"
        ].join(","),
    },
});

export default theme