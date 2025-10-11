function applyPalette() {
    const checked = document.querySelector('input[id^="palette-color-"]:checked');
    if (!checked) return;

    const color = checked.id.replace("palette-color-", "");

    document.documentElement.classList.forEach(cls => {
        if (cls.startsWith("palette-color-")) {
            document.documentElement.classList.remove(cls);
        }
    });

    document.documentElement.classList.add(`palette-color-${color}`);

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
        applyPalette();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('input[id^="palette-color-"]').forEach(radio => {
        radio.addEventListener("change", applyPalette);
    });

    restorePalette();
});
