document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = [
        document.getElementById('fullscreen'),
        document.getElementById('top-navbar')
    ].filter(Boolean);

    if (checkboxes.length === 0) return;

    const widthQuery = window.matchMedia('(max-width: 750px)');
    const heightQuery = window.matchMedia('(max-height: 450px)');

    function handleResize() {
        const shouldCheck = widthQuery.matches || heightQuery.matches;
        checkboxes.forEach(checkbox => {
            checkbox.checked = shouldCheck;
        });
    }

    handleResize();

    widthQuery.addEventListener('change', handleResize);
    heightQuery.addEventListener('change', handleResize);
});
