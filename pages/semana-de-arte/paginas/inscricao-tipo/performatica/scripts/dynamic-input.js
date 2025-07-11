function addMember(name = "") {
    const container = document.getElementById("members-container");

    const wrapper = document.createElement("div");
    wrapper.classList.add("member-wrapper");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "Integrantes";
    input.placeholder = "ex: Murilo, João, ...";
    input.value = name;
    input.classList.add("member-input");

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.innerText = "❌";
    removeBtn.classList.add("remove-button");
    removeBtn.onclick = () => container.removeChild(wrapper);

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);
}

function addResource(value = "") {
    const container = document.getElementById("resources-container");

    const wrapper = document.createElement("div");
    wrapper.classList.add("resource-wrapper");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "Recursos";
    input.placeholder = "ex: Microfone, Mesa, ...";
    input.value = value;
    input.classList.add("resource-input");

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
    addMember();
});
