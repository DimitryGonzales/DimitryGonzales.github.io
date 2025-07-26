document.querySelectorAll('.skill-titlebar').forEach(titlebar => {
    titlebar.addEventListener('click', () => {
        const skillDiv = titlebar.closest('.skill');
        if (!skillDiv) return;
        
        const checkbox = skillDiv.previousElementSibling;
        if (checkbox && checkbox.type === 'checkbox') {
            checkbox.checked = !checkbox.checked;
        }
    });
});