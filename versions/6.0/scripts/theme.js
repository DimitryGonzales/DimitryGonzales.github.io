document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("theme-toggle");
    const root = document.documentElement;

    // Apply dark or light theme
    function applyTheme(isDark) {
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        checkbox.checked = isDark;
    }

    // Check localStorage or system preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            applyTheme(true);
        } else if (savedTheme === "light") {
            applyTheme(false);
        } else {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(systemPrefersDark);
        }
    }

    // Save and apply on toggle
    checkbox.addEventListener("change", function () {
        const isDark = checkbox.checked;
        applyTheme(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Live update from system preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            applyTheme(e.matches);
        }
    });

    initializeTheme();
});
