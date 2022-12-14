import { createTheme } from "@mui/material";
import "../Fonts.css"

const theme = createTheme({
    palette: {
        primary: {
            main: "#7dd1a4",
            dark: "#e5f5ed",
            light: "#f5f5f5",
        },
        secondary: {
            main: "#000000",
            bg: "#ffffff",
            canvas: "#efefef",
        },
    },
    typography: {
        fontFamily: [
            "Poppins",
            "Arial"
        ].join(","),
    },
});

export default theme