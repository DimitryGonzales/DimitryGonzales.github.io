const searchInput = document.getElementById("search");
const searchResults = document.querySelectorAll(".search-result");

searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    searchResults.forEach(result => {
        const title = result.querySelector(".search-result-title").textContent.toLowerCase();

        if (title.includes(query)) {
            result.style.display = "flex";
        } else {
            result.style.display = "none";
        }
    });
});
