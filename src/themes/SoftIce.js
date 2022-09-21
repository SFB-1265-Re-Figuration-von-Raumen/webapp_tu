import { createTheme } from "@mui/material";
import "../Fonts.css"

export const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#cccccc",
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