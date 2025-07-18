document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const brightnessToggle = document.getElementById("brightness-toggle");
    const paletteSelector = document.getElementById("palette-selector");

    // Load saved settings
    const savedPalette = localStorage.getItem("palette") || "default";
    const savedBrightness = localStorage.getItem("brightness") || "light";

    paletteSelector.value = savedPalette;
    brightnessToggle.checked = savedBrightness === "dark";

    // Apply theme
    function applyTheme() {
        const palette = paletteSelector.value;
        const brightness = brightnessToggle.checked ? "dark" : "light";

        // Remove all existing theme classes
        body.className = "";

        // Build and apply the new class structure: .palette.brightness
        const className = palette === "default" ? brightness : `${palette}.${brightness}`;
        body.classList.add(...className.split("."));

        // Save to localStorage
        localStorage.setItem("palette", palette);
        localStorage.setItem("brightness", brightness);
    }

    // Apply theme on load
    applyTheme();

    // Event listeners
    brightnessToggle.addEventListener("change", applyTheme);
    paletteSelector.addEventListener("change", applyTheme);
});
