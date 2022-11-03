import React from 'react'
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { useContext } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";
import "../Fonts.css";

const ThemeSelector = () => {

    const { currentTheme, setTheme } = useContext(CustomThemeContext);

    return (
        <Box sx={{
            position: "fixed",
            zIndex: 1,
            margin: "1rem"
        }}>
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
                variant="outlined"
            >
                <Button
                    sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        color: "#7dd1a4",
                        borderColor: "#000000",
                    }}
                    onClick={() => { setTheme("regular") }}>Regular</Button>
                <Button
                    sx={{
                        fontFamily: "Space Mono",
                        fontWeight: "bold",
                        borderColor: "#000000",
                        color: "#000000",
                    }}
                    onClick={() => { setTheme("softice") }}>Dark</Button>
                <Button
                    sx={{
                        fontFamily: "Ark-Es",
                        fontWeight: "bold",
                        borderColor: "#000000",
                        color: "#ff0000",
                    }}
                    onClick={() => { setTheme("space") }}>Space</Button>
            </ButtonGroup>

        </Box>
    )
}

export default ThemeSelector