import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import "./Fonts.css"

// We will have a total of 3 themes🧮

// Regular Theme
// Soft Ice Theme
// Space Theme


// Regular Theme
const theme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
        secondary: {
            main: "#ffffff",
        },
    },
    typography: {
        fontFamily: [
            "Space Mono",
            "Arial"
            // "Ark-Es",
        ].join(","),
    },
});

const darktheme = createTheme({
    palette: {
        primary: {

            main: "#ffffff",
        },
        secondary: {
            main: "#000000",
        },
    },
    typography: {
        fontFamily: [
            // "Space Mono",
            "Arial",
            "Ark-Es",
        ].join(","),
    },
});


export default theme