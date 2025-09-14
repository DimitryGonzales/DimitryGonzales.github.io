function applyPaletteType() {
    const checked = document.querySelector('input[id^="palette-type-"]:checked');
    if (!checked) return;

    const type = checked.id.replace("palette-type-", "");

    // remove any existing palette-type-* classes
    document.documentElement.classList.forEach(cls => {
        if (cls.startsWith("palette-type-")) {
            document.documentElement.classList.remove(cls);
        }
    });

    // add the new class
    document.documentElement.classList.add(`palette-type-${type}`);

    // save selection
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
        // if nothing saved, just apply the currently checked one
        applyPaletteType();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // attach listeners
    document.querySelectorAll('input[id^="palette-type-"]').forEach(radio => {
        radio.addEventListener("change", applyPaletteType);
    });

    // run at startup
    restorePaletteType();
});
