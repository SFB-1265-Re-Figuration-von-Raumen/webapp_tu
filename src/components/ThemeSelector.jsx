import React from 'react'
import { FormControlLabel, FormGroup, Switch, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";

const ThemeSelector = () => {

    const { currentTheme, setTheme } = useContext(CustomThemeContext);
    const isSoftIce = Boolean(currentTheme === "softice");

    const handleThemeChange = () => {
        const { checked } = event.target;
        if (checked) {
            setTheme("softice");
        } else {
            setTheme("regular");
        }
    }

    return (
        <div>
            <FormGroup sx={{
                position: "fixed",
                zIndex: 1,
                margin: "1rem"
            }}>
                <FormControlLabel control={<Switch defaultChecked onChange={handleThemeChange} />} label="Theme" />
            </FormGroup>
            {/* Buttongroup */}
            
        </div>
    )
}

export default ThemeSelector