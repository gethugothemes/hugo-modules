(function () {
  "use strict";
  // gallery init
  GLightbox();

  // gallery slider
  var isGallerySlider = document.getElementsByClassName("gallery-slider");
  if (isGallerySlider.length > 0) {
    new Swiper(".gallery-slider", {
      slidesPerView: 1,
      loop: true,
      autoHeight: true,
      spaceBetween: 0,
      speed: 1500,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
})();
