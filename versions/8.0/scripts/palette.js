function applyPalette() {
    const checked = document.querySelector('input[id^="palette-color-"]:checked');
    if (!checked) return;

    const color = checked.id.replace("palette-color-", "");

    // Remove any existing palette-color-* classes
    document.documentElement.classList.forEach(cls => {
        if (cls.startsWith("palette-color-")) {
            document.documentElement.classList.remove(cls);
        }
    });

    // Add new class
    document.documentElement.classList.add(`palette-color-${color}`);

    // Save selection in localStorage
    localStorage.setItem("selectedPaletteColor", color);
}

function restorePalette() {
    const saved = localStorage.getItem("selectedPaletteColor");
    if (saved) {
        const radio = document.getElementById(`palette-color-${saved}`);
        if (radio) {
            radio.checked = true;
            applyPalette();
        }
    } else {
        // If nothing saved, just apply the currently checked one
        applyPalette();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Attach listeners
    document.querySelectorAll('input[id^="palette-color-"]').forEach(radio => {
        radio.addEventListener("change", applyPalette);
    });

    // Run at startup
    restorePalette();
});
