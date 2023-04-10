(function () {
  "use strict";
  // gallery init
  GLightbox();

  // justified gallery init
  window.setTimeout(() => {
    const justify_scale = screen.height * 0.25;
    let items = document.querySelectorAll(".gallery-item");
    Array.prototype.forEach.call(items, (item) => {
      let image = item.querySelector("img");
      let ratio = image.width / image.height;
      item.style.width = justify_scale * ratio + "px";
      item.style.flexGrow = ratio;
    });
  }, 200);

  // gallery slider
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
})();
