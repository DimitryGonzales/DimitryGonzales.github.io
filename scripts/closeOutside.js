const outsideClickHandlers = new WeakMap();

function uncheckOnOutsideClick(checkboxId, containerClass) {
    const checkbox = document.getElementById(checkboxId);
    const container = document.querySelector(`.${containerClass}`);
    const label = document.querySelector(`label[for="${checkboxId}"]`);

    if (!checkbox || !container) return;

    // Avoid adding multiple listeners for the same checkbox
    if (outsideClickHandlers.has(checkbox)) return;

    const handler = function(event) {
        // Defer execution so checkbox toggles first
        setTimeout(() => {
            if (!checkbox.checked) return;

            const clickedInsideContainer = container.contains(event.target);
            const clickedOnCheckboxOrLabel = checkbox.contains(event.target) || (label && label.contains(event.target));

            // Only uncheck if click is completely outside container and outside label/checkbox
            if (!clickedInsideContainer && !clickedOnCheckboxOrLabel) {
                checkbox.checked = false;
            }
        }, 0);
    };

    document.addEventListener('click', handler);
    outsideClickHandlers.set(checkbox, handler);
}

uncheckOnOutsideClick("menu-toggle", "menu");
uncheckOnOutsideClick("toggle-palette-selector", "palette-selector");
