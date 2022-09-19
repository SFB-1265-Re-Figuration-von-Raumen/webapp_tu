import React from 'react'
import { Box, Button, ButtonGroup, FormControlLabel, FormGroup, Switch, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";

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
                <Button onClick={() => { setTheme("regular") }}>Regular</Button>
                <Button onClick={() => { setTheme("softice") }}>Soft Ice</Button>
                <Button onClick={() => { setTheme("space") }}>Space</Button>
            </ButtonGroup>

        </Box>
    )
}

export default ThemeSelector