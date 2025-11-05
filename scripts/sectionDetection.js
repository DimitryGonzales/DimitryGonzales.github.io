document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const indicators = document.querySelectorAll("[class*='section-indicator-']");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                indicators.forEach(indicator => {
                    indicator.classList.remove("section-indicator-current");
                });

                const activeIndicator = document.querySelector(`.section-indicator-${sectionId}`);
                if (activeIndicator) {
                    activeIndicator.classList.add("section-indicator-current");
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
