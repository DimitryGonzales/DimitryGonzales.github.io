document.addEventListener("DOMContentLoaded", function () {
    const themeSwitcher = document.getElementById("theme-switcher");
    const body = document.body;

    let storedTheme = localStorage.getItem("theme");
    let switchState = localStorage.getItem("themeSwitcherChecked");
    
    if (!storedTheme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        storedTheme = prefersDark ? "dark" : "light";
        switchState = prefersDark ? "true" : "false";

        localStorage.setItem("theme", storedTheme);
        localStorage.setItem("themeSwitcherChecked", switchState);
    }

    if (storedTheme === "dark") {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }

    themeSwitcher.checked = switchState === "true";

    themeSwitcher.addEventListener("change", () => {
        const isDark = themeSwitcher.checked;
        body.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
        localStorage.setItem("themeSwitcherChecked", isDark.toString());
    });
});
