const brightnessToggle = document.getElementById('brightness-toggle');
const paletteSelect = document.getElementById('palette-select');
const body = document.body;

let isDark = false;
let currentPalette = '';

window.addEventListener('DOMContentLoaded', () => {
    const storedMode = localStorage.getItem('theme-mode');
    const storedPalette = localStorage.getItem('theme-palette');

    isDark = storedMode === 'dark';
    currentPalette = storedPalette ?? '';

    paletteSelect.value = currentPalette;
    brightnessToggle.checked = isDark;
    updateTheme();
});

brightnessToggle.addEventListener('change', () => {
    isDark = brightnessToggle.checked;
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
    updateTheme();
});

paletteSelect.addEventListener('change', (e) => {
    currentPalette = e.target.value;
    localStorage.setItem('theme-palette', currentPalette);
    updateTheme();
});

function updateTheme() {
    body.className = '';

    if (currentPalette) body.classList.add(currentPalette);
    if (isDark) body.classList.add('dark');

    brightnessToggle.checked = isDark;
}
