// main script
(function () {
  "use strict";

  // Get all the accordion buttons
  const ghtmAccordion = document.querySelectorAll(".ghtm-accordion-header");
  ghtmAccordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });
})();
