function addAuthor(name = "") {
    const container = document.getElementById("authors-container");

    const wrapper = document.createElement("div");
    wrapper.classList.add("author-wrapper");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "Autores";
    input.placeholder = "ex: Da Vinci, Michelangelo, ...";
    input.value = name;
    input.classList.add("author-input");

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.innerText = "❌";
    removeBtn.classList.add("remove-button");
    removeBtn.onclick = () => container.removeChild(wrapper);

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);
}

document.addEventListener("DOMContentLoaded", () => {
    addAuthor();
});
