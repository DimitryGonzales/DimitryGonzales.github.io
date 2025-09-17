function applyPaletteType() {
    const checked = document.querySelector('input[id^="palette-type-"]:checked');
    if (!checked) return;

    const type = checked.id.replace("palette-type-", "");

    // Remove any existing palette-type-* classes
    document.documentElement.classList.forEach(cls => {
        if (cls.startsWith("palette-type-")) {
            document.documentElement.classList.remove(cls);
        }
    });

    // Add the new class
    document.documentElement.classList.add(`palette-type-${type}`);

    // Save selection
    localStorage.setItem("selectedPaletteType", type);
}

function restorePaletteType() {
    const saved = localStorage.getItem("selectedPaletteType");

    if (saved) {
        // Restore saved theme
        const radio = document.getElementById(`palette-type-${saved}`);
        if (radio) {
            radio.checked = true;
            applyPaletteType();
        }
    } else {
        // Detect system preference the first time
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const systemType = prefersDark ? "dark" : "light";

        const radio = document.getElementById(`palette-type-${systemType}`);
        if (radio) {
            radio.checked = true;
            applyPaletteType();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Attach listeners
    document.querySelectorAll('input[id^="palette-type-"]').forEach(radio => {
        radio.addEventListener("change", applyPaletteType);
    });

    // Run at startup
    restorePaletteType();
});
