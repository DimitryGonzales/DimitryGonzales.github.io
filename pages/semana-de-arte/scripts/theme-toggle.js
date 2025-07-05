document.addEventListener("DOMContentLoaded", function () {
    const themeSwitcher = document.getElementById("theme-switcher");
    const body = document.body;

    const storedTheme = localStorage.getItem("theme");
    const switchState = localStorage.getItem("themeSwitcherChecked");

    if (storedTheme === "dark") {
        body.classList.add("dark");
    }

    if (switchState === "true") {
        themeSwitcher.checked = true;
    } else {
        themeSwitcher.checked = false;
    }

    themeSwitcher.addEventListener("change", () => {
        const isDark = themeSwitcher.checked;

        body.classList.toggle("dark", isDark);

        localStorage.setItem("theme", isDark ? "dark" : "light");
        localStorage.setItem("themeSwitcherChecked", isDark.toString());
    });
});
