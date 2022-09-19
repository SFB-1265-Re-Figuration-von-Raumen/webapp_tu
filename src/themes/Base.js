import regular from "./Regular"
import softice from "./SoftIce"

const themes = {
    regular,
    softice,
}

export default function getTheme(theme) {
    return themes[theme]
}