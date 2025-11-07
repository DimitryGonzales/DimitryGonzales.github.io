document.addEventListener("DOMContentLoaded", () => {
    let lastClicked = null;

    document.addEventListener("click", (event) => {
        const target = event.target.closest(".when-click");
        if (!target) return;

        if (lastClicked && lastClicked !== target) {
            lastClicked.classList.remove("clicked");
        }

        if (target === lastClicked) {
            target.classList.remove("clicked");
            void target.offsetWidth;
            target.classList.add("clicked");
        } else {
            target.classList.add("clicked");
        }

        lastClicked = target;
    });
});
