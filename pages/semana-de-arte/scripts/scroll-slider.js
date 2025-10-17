const scrollContainer = document.querySelector('.slider');

let isDown = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;

scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    startY = e.pageY - scrollContainer.offsetTop;
    scrollLeft = scrollContainer.scrollLeft;
    scrollTop = scrollContainer.scrollTop;
});

scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
});

scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
});

scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const y = e.pageY - scrollContainer.offsetTop;
    const walkX = x - startX;
    const walkY = y - startY;
    scrollContainer.scrollLeft = scrollLeft - walkX;
    scrollContainer.scrollTop = scrollTop - walkY;
});

scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
}, { passive: false });

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    if (!slider) return;

    let scrollSpeed = 1;
    let requestId;

    function autoScroll() {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
            slider.scrollLeft = 0;
        } else {
            slider.scrollLeft += scrollSpeed;
        }
        requestId = requestAnimationFrame(autoScroll);
    }

    autoScroll();

    slider.addEventListener("mouseenter", () => cancelAnimationFrame(requestId));
    slider.addEventListener("mouseleave", () => autoScroll());
});
