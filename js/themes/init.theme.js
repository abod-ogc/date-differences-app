import applyTheme from "./apply.theme.js";

export default function initTheme(){
    const savedTheme = localStorage.getItem("theme") || "system";

    applyTheme(savedTheme);
}