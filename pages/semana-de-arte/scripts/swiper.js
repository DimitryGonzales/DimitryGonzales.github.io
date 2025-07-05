var swiper = new Swiper(".swiper", {
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,

    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
