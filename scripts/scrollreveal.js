// Left
ScrollReveal().reveal('label[for="navbar-toggle"]', {
    duration: 500,
    distance: '50px',
    easing: 'ease',
    origin: 'left',
    reset: false
});

// Right
ScrollReveal().reveal('.language-selector-container, .return-to-top', {
    duration: 500,
    distance: '50px',
    easing: 'ease',
    origin: 'right',
    reset: false
});

// Bottom
ScrollReveal().reveal('#hero, .hero-image-container, .hero-text, .hero-shortcut, #projects, .project, #skills, .skill', {
    duration: 500,
    distance: '50px',
    easing: 'ease',
    interval: 100,
    origin: 'bottom',
    reset: false
});
