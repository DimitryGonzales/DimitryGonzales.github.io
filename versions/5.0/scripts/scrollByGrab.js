document.querySelectorAll('.scroll-by-grab').forEach((el) => {
    let isDown = false;
    let startX, startY, scrollLeft, scrollTop;

    el.style.cursor = 'grab';

    el.addEventListener('mousedown', (e) => {
        isDown = true;
        el.classList.add('grabbing');
        el.style.cursor = 'grabbing';
        startX = e.pageX - el.offsetLeft;
        startY = e.pageY - el.offsetTop;
        scrollLeft = el.scrollLeft;
        scrollTop = el.scrollTop;
    });

    el.addEventListener('mouseleave', () => {
        isDown = false;
        el.classList.remove('grabbing');
        el.style.cursor = 'grab';
    });

    el.addEventListener('mouseup', () => {
        isDown = false;
        el.classList.remove('grabbing');
        el.style.cursor = 'grab';
    });

    el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const y = e.pageY - el.offsetTop;
        const walkX = x - startX;
        const walkY = y - startY;
        el.scrollLeft = scrollLeft - walkX;
        el.scrollTop = scrollTop - walkY;
    });
});
