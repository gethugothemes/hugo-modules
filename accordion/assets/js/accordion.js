// accordion script
(function () {
  "use strict";

  const ghtmAccordion = document.querySelectorAll("[data-accordion]");
  ghtmAccordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });
})();
