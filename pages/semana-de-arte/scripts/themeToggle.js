document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        html.classList.add("dark");
        if (toggle) toggle.checked = true;
    } else {
        html.classList.remove("dark");
        if (toggle) toggle.checked = false;
    }

    if (toggle) {
        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                html.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                html.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            if (e.matches) {
                html.classList.add("dark");
                if (toggle) toggle.checked = true;
            } else {
                html.classList.remove("dark");
                if (toggle) toggle.checked = false;
            }
        }
    });
});
