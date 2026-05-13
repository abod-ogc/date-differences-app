import applyTheme from "./apply.theme.js";

export default function bindThemeEvents(){
    const themeToggler = document.querySelector('.theme-toggler');
    const themesList = document.querySelector('.themes-list');
    themeToggler.addEventListener('click', () => {
        themesList.classList.toggle("show");
    });

    document.addEventListener('click', (e) => {
        if(e.target !== themesList && e.target !== themeToggler)
            themesList.classList.remove("show");
    });

    const themeItems = document.querySelectorAll('.theme-item');

    themeItems.forEach(item => {
        item.addEventListener("click", () => {
            const theme = item.dataset.theme;
            applyTheme(theme);
            updateSelectedTheme(theme);
        });
    });

    const savedTheme = localStorage.getItem("theme") || "system";
    updateSelectedTheme(savedTheme);
}

function updateSelectedTheme(theme){
    const themeItems = document.querySelectorAll(".theme-item");
    themeItems.forEach(item => {
        item.classList.remove("selected");

        if(item.dataset.theme === theme){
            item.classList.add("selected");
        }
    });
}