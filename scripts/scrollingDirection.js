function addScrollDownListener(elements) {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollingDown = currentScrollTop > lastScrollTop;

        elements.forEach(item => {
            const elById = item.id ? document.getElementById(item.id) : null;
            const elByClass = item.class ? document.querySelector(`.${item.class}`) : null;

            [elById, elByClass].forEach(el => {
                if (el) {
                    if (scrollingDown) {
                        el.classList.add('scrolling-down');
                    } else {
                        el.classList.remove('scrolling-down');
                    }
                }
            });
        });

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
}

function addScrollUpListener(elements) {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollingUp = currentScrollTop < lastScrollTop;

        elements.forEach(item => {
            const elById = item.id ? document.getElementById(item.id) : null;
            const elByClass = item.class ? document.querySelector(`.${item.class}`) : null;

            [elById, elByClass].forEach(el => {
                if (el) {
                    if (scrollingUp) {
                        el.classList.add('scrolling-up');
                    } else {
                        el.classList.remove('scrolling-up');
                    }
                }
            });
        });

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
}

addScrollDownListener([
    { class: '' },
    { id: 'navbar' }
]);

addScrollUpListener([
    { class: 'go-to-top' },
    { id: '' }
]);
