const themeToggle = document.getElementById("theme-toggle");

function applyTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add("dark");
        themeToggle.checked = true;
    } else {
        document.documentElement.classList.remove("dark");
        themeToggle.checked = false;
    }
}

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
});

applyTheme();