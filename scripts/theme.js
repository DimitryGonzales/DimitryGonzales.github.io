document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const brightnessToggle = document.getElementById("brightness-toggle");
    const paletteSelector = document.getElementById("palette-selector");

    // Detect device theme preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Load saved settings or use system preference
    const savedPalette = localStorage.getItem("palette") || "default";
    const savedBrightness = localStorage.getItem("brightness");

    // Determine brightness: use saved or fallback to system preference
    const brightness = savedBrightness || (systemPrefersDark ? "dark" : "light");

    paletteSelector.value = savedPalette;
    brightnessToggle.checked = brightness === "dark";

    // Apply theme
    function applyTheme() {
        const palette = paletteSelector.value;
        const brightness = brightnessToggle.checked ? "dark" : "light";

        // Build new class list
        const className = palette === "default" ? brightness : `${palette}.${brightness}`;
        const classList = className.split(".");

        // Clear existing theme classes
        root.className = "";

        // Apply new theme classes to <html>
        root.classList.add(...classList);

        // Save settings
        localStorage.setItem("palette", palette);
        localStorage.setItem("brightness", brightness);
    }

    // Apply theme on load
    applyTheme();

    // Event listeners
    brightnessToggle.addEventListener("change", applyTheme);
    paletteSelector.addEventListener("change", applyTheme);
});
