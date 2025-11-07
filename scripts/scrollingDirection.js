document.addEventListener("DOMContentLoaded", () => {
    let lastScrollY = window.scrollY;
    const upElements = document.querySelectorAll(".when-scroll-up");
    const downElements = document.querySelectorAll(".when-scroll-down");

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < lastScrollY;

        if (scrollingUp) {
            upElements.forEach(el => el.classList.add("scrolling-up"));
            upElements.forEach(el => el.classList.remove("scrolling-down"));
            downElements.forEach(el => el.classList.remove("scrolling-down"));
        } else if (currentScrollY > lastScrollY) {
            downElements.forEach(el => el.classList.add("scrolling-down"));
            downElements.forEach(el => el.classList.remove("scrolling-up"));
            upElements.forEach(el => el.classList.remove("scrolling-up"));
        }

        lastScrollY = currentScrollY;
    });
});
