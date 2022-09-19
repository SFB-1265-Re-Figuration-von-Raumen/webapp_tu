import { createTheme } from "@mui/material";
import "../Fonts.css"

export const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#ffdccc",
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