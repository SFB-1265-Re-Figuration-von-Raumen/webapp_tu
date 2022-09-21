import React from 'react'
import { Box, Button, ButtonGroup } from "@mui/material";
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
                variant="contained"
            >
                <Button
                    sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                    }}
                    onClick={() => { setTheme("regular") }}>Regular</Button>
                <Button
                    sx={{
                        fontFamily: "Space Mono",
                        fontWeight: "bold",
                    }}
                    onClick={() => { setTheme("softice") }}>Soft Ice</Button>
                <Button
                    sx={{
                        fontFamily: "Ark-Es",
                        fontWeight: "bold",
                    }}
                    onClick={() => { setTheme("space") }}>Space</Button>
            </ButtonGroup>

        </Box>
    )
}

export default ThemeSelector