document.querySelectorAll('#navbar .navbar-button').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('navbar-toggle').checked = false;
    });
});