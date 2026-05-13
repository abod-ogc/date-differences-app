const root = document.documentElement;

export default function applyTheme(theme){
    if(theme === "system"){
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.dataset.theme = systemDark ? "dark" : "light";
    }
    else{
        root.dataset.theme = theme;
    }

    localStorage.setItem("theme", theme);
}