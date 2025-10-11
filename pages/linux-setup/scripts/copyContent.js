document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".code-copy-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const codeBlock = button.closest("code");
            if (!codeBlock) return;

            const temp = codeBlock.cloneNode(true);
            temp.querySelectorAll(".code-copy-button").forEach(btn => btn.remove());

            const textToCopy = temp.innerText.trim();

            navigator.clipboard.writeText(textToCopy).then(() => {
                button.classList.add("copied");
                setTimeout(() => {
                    button.classList.remove("copied");
                }, 2000);
            });
        });
    });
});
