function applyPaletteType() {
    const checked = document.querySelector('input[id^="palette-type-"]:checked');
    if (!checked) return;

    const type = checked.id.replace("palette-type-", "");

    document.documentElement.classList.forEach(cls => {
        if (cls.startsWith("palette-type-")) {
            document.documentElement.classList.remove(cls);
        }
    });

    document.documentElement.classList.add(`palette-type-${type}`);

    localStorage.setItem("selectedPaletteType", type);
}

function restorePaletteType() {
    const saved = localStorage.getItem("selectedPaletteType");

    if (saved) {
        const radio = document.getElementById(`palette-type-${saved}`);
        if (radio) {
            radio.checked = true;
            applyPaletteType();
        }
    } else {
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
    document.querySelectorAll('input[id^="palette-type-"]').forEach(radio => {
        radio.addEventListener("change", applyPaletteType);
    });

    restorePaletteType();
});
