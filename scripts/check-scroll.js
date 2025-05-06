const scrollElements = [
    document.getElementById("label-theme-toggle"),
    document.getElementById("label-navbar-toggle"),
    document.getElementById("navbar"),
    document.getElementById("label-social-toggle"),
    ...document.querySelectorAll(".social-button")
];
  
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 0;
    scrollElements.forEach(el => {
        if (el) el.classList.toggle("scrolled", scrolled);
    });
});