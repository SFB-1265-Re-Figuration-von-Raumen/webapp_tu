import regular from "./Regular"
import softice from "./SoftIce"
import space from "./Space"

const themes = {
    regular,
    softice,
    space
}

export default function getTheme(theme) {
    return themes[theme]
}