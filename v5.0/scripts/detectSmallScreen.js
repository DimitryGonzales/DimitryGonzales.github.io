document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = [
        document.getElementById('fullscreen'),
        document.getElementById('top-navbar')
    ].filter(Boolean); // Removes any nulls if an ID is missing

    if (checkboxes.length === 0) return;

    const mediaQuery = window.matchMedia('(max-width: 625px)');

    function handleResize(e) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.matches;
        });
    }

    handleResize(mediaQuery);

    mediaQuery.addEventListener('change', handleResize);
});
