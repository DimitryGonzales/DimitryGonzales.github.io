document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const colorLabels = document.querySelectorAll(".palette-color-label");
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const applyDark = (enable) => {
        if (enable) {
            html.classList.add("dark");
            colorLabels.forEach(el => el.classList.add("dark"));
        } else {
            html.classList.remove("dark");
            colorLabels.forEach(el => el.classList.remove("dark"));
        }
    };

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        applyDark(true);
        if (toggle) toggle.checked = true;
    } else {
        applyDark(false);
        if (toggle) toggle.checked = false;
    }

    if (toggle) {
        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                applyDark(true);
                localStorage.setItem("theme", "dark");
            } else {
                applyDark(false);
                localStorage.setItem("theme", "light");
            }
        });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            applyDark(e.matches);
            if (toggle) toggle.checked = e.matches;
        }
    });
});
