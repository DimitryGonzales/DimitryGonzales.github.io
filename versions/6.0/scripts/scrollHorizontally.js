document.addEventListener("DOMContentLoaded", () => {
    const scrollContainers = document.querySelectorAll(".scroll-horizontally");

    scrollContainers.forEach(container => {
        container.addEventListener("wheel", (event) => {
        
        if (event.deltaY !== 0) {
            event.preventDefault();
            container.scrollLeft += event.deltaY;
        }
        }, { passive: false });
    });
});
