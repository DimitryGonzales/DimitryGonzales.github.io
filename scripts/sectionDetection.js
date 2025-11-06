document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const indicators = document.querySelectorAll("[class*='section-indicator-']");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    const visibleSections = new Map(); // track visibility ratio of each section

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
        });

        // Find which sections are visible
        const fullyVisible = Array.from(visibleSections.entries())
            .filter(([_, ratio]) => ratio >= 0.99); 
        const partiallyVisible = Array.from(visibleSections.entries())
            .filter(([_, ratio]) => ratio > 0);

        // Decide which section to highlight
        let currentSectionId = null;
        if (fullyVisible.length === 1) {
            currentSectionId = fullyVisible[0][0]; // only one fully visible
        } else if (partiallyVisible.length === 1) {
            currentSectionId = partiallyVisible[0][0]; // only one visible at all
        } else {
            // Choose the one with the highest visibility ratio
            currentSectionId = partiallyVisible.sort((a, b) => b[1] - a[1])[0]?.[0];
        }

        // Update indicators
        indicators.forEach(indicator => indicator.classList.remove("section-indicator-current"));
        if (currentSectionId) {
            const activeIndicator = document.querySelector(`.section-indicator-${currentSectionId}`);
            if (activeIndicator) activeIndicator.classList.add("section-indicator-current");
        }
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    function buildThresholdList() {
        const thresholds = [];
        for (let i = 0; i <= 1; i += 0.01) thresholds.push(i);
        return thresholds;
    }
});
