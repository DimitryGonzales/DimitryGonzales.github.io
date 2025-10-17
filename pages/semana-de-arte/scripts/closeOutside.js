const outsideClickHandlers = new WeakMap();

function uncheckOnOutsideClick(checkboxId, containerClass) {
    const checkbox = document.getElementById(checkboxId);
    const container = document.querySelector(`.${containerClass}`);
    const label = document.querySelector(`label[for="${checkboxId}"]`);

    if (!checkbox || !container) return;

    if (outsideClickHandlers.has(checkbox)) return;

    const handler = function(event) {
        setTimeout(() => {
            if (!checkbox.checked) return;

            const clickedInsideContainer = container.contains(event.target);
            const clickedOnCheckboxOrLabel = checkbox.contains(event.target) || (label && label.contains(event.target));

            if (!clickedInsideContainer && !clickedOnCheckboxOrLabel) {
                checkbox.checked = false;
            }
        }, 0);
    };

    document.addEventListener('click', handler);
    outsideClickHandlers.set(checkbox, handler);
}

uncheckOnOutsideClick("menu-toggle", "menu");
