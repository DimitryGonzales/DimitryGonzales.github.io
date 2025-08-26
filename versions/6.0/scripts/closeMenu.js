document.addEventListener("DOMContentLoaded", () => {
    const shortcuts = document.querySelectorAll(".shortcut");
    const navbarToggle = document.getElementById("navbar-toggle");

    shortcuts.forEach(shortcut => {
        shortcut.addEventListener("click", () => {
            navbarToggle.checked = false;
        });
    });
});
