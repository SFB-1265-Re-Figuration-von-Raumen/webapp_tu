import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import "./Fonts.css"

export const theme = createTheme({
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
            // "Space Mono",
        ].join(","),
    },
});

export default theme