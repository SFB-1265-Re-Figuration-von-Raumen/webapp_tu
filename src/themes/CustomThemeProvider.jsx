import React, { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material";
import getTheme from "./Base"


export const CustomThemeContext = createContext({
    currentTheme: "regular",
    setTheme: null,
});

const CustomThemeProvider = (props) => {
    const { children } = props;

    // read local storage for theme
    const currentTheme = localStorage.getItem("theme") || "regular";

    // state that holds the selected theme name
    const [themeName, _setThemeName] = useState(currentTheme);

    // retrieve the theme object by theme name
    const theme = getTheme(themeName);

    // wrap _setThemeName to store new theme names in local storage

    const setThemeName = (name) => {
        localStorage.setItem("theme", name);
        _setThemeName(name);
    }

    const contextValue = {
        currentTheme: themeName,
        setTheme: setThemeName,
    };

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    )
}

export default CustomThemeProvider