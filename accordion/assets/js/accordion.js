// accordion script
(function () {
  "use strict";
  window.addEventListener('DOMContentLoaded', () => {
    const accordionContents = document.querySelectorAll('.accordion-content');
    accordionContents.forEach(content => {
      const contentHeight = content.scrollHeight;
      content.style.setProperty('--max-height', `${contentHeight}px`);
    });

    const accordions = document.querySelectorAll("[data-accordion]");
    accordions.forEach((header) => {
      header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains("active");

        // Remove active class from other accordion items
        accordions.forEach((otherHeader) => {
          const otherAccordionItem = otherHeader.parentElement;
          if (otherAccordionItem !== accordionItem) {
            otherAccordionItem.classList.remove("active");
          }
        });

        // Toggle active class for the clicked accordion item
        accordionItem.classList.toggle("active", !isActive);
      });
    });
    // end of toggling active-class
  });
})();