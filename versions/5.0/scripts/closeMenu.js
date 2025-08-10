document.addEventListener("DOMContentLoaded", () => {
    const shortcuts = document.querySelectorAll(".shortcut");
    const menuToggle = document.getElementById("menu-toggle");

    shortcuts.forEach(shortcut => {
        shortcut.addEventListener("click", () => {
            menuToggle.checked = false;
        });
    });
});
