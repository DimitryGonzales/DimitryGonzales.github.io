document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section[id]");
    const html = document.documentElement;

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    const visibleSections = new Map();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
        });

        const fullyVisible = Array.from(visibleSections.entries())
            .filter(([_, ratio]) => ratio >= 0.99); 
        const partiallyVisible = Array.from(visibleSections.entries())
            .filter(([_, ratio]) => ratio > 0);

        let currentSectionId = null;
        if (fullyVisible.length === 1) {
            currentSectionId = fullyVisible[0][0];
        } else if (partiallyVisible.length === 1) {
            currentSectionId = partiallyVisible[0][0];
        } else {
            currentSectionId = partiallyVisible.sort((a, b) => b[1] - a[1])[0]?.[0];
        }

        html.classList.forEach(cls => {
            if (cls.startsWith("current-section-")) {
                html.classList.remove(cls);
            }
        });

        if (currentSectionId) {
            html.classList.add(`current-section-${currentSectionId}`);
        }
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    function buildThresholdList() {
        const thresholds = [];
        for (let i = 0; i <= 1; i += 0.01) thresholds.push(i);
        return thresholds;
    }
});
