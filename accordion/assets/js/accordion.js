// accordion script
(function () {
  "use strict";

  const accordions = document.querySelectorAll("[data-accordion]");
  accordions.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });
})();
