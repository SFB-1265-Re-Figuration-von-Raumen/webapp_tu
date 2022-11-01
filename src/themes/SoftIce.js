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
            main: "#ffffff",
            // main: "#000000",
            bg: "#2c2c2c",
            canvas: "#b1b1b1",
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