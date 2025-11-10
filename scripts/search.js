document.addEventListener("DOMContentLoaded", () => {
    const searchInputs = document.querySelectorAll("[class^='search-']");

    searchInputs.forEach(input => {
        const match = input.className.match(/search-([^\s]+)/);
        if (!match) return;

        const name = match[1];
        const results = document.querySelectorAll(`.search-${name}-result`);

        input.addEventListener("input", () => {
            const query = input.value.trim().toLowerCase();

            results.forEach(el => {
                const text = el.textContent.toLowerCase();
                if (text.includes(query) || query === "") {
                    el.style.display = "flex";
                } else {
                    el.style.display = "none";
                }
            });
        });
    });
});
