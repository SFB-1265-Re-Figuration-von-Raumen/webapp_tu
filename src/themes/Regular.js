import { createTheme } from "@mui/material";
import "../Fonts.css"

const theme = createTheme({
    palette: {
        primary: {
            main: "#7dd1a4",
        },
        secondary: {
            main: "#ffffff",
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