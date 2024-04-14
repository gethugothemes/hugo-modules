// tab script
(function () {
  "use strict";

  const tabGroups = document.querySelectorAll("[data-tab-group]");
  const tablist = document.querySelectorAll("[data-tab-nav] [data-tab]");

  function activate(tabsNav, tabsContent, tabName) {
    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`
    );
    selectedTabPane.classList.add("active");
  }

  function setActiveTab(tabGroup, tabName) {
    if (!tabGroup.dataset.tabGroup) {
      // tabs group name is falsy, process as an independent tabs group
      const tabsNav = tabGroup.querySelector("[data-tab-nav]");
      const tabsContent = tabGroup.querySelector("[data-tab-content]");
      activate(tabsNav, tabsContent, tabName);
    } else {
      // Select for all tabs groups with the same non-falsy group name
      const tabsNavAll = document.querySelectorAll(`[data-tab-group=${tabGroup.dataset.tabGroup}] > [data-tab-nav]`);
      const tabsContentAll = document.querySelectorAll(`[data-tab-group=${tabGroup.dataset.tabGroup}] > [data-tab-content]`);

      tabsNavAll.forEach((tabsNav, index) => {
        const tabsContent = tabsContentAll[index];
        if (tabsContent === undefined) {
          return;
        }
        activate(tabsNav, tabsContent, tabName);
      });
    }
  }

  tabGroups.forEach((tabGroup) => {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
    const activeTabName = tabsNavItem[0].getAttribute("data-tab");

    setActiveTab(tabGroup, activeTabName);

    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);
      });
    });
  });

  function tabsHandler(event) {
    let index = Array.from(tablist).indexOf(this);
    let numbTabs = tablist.length;
    let nextId;
    if (numbTabs > 1) {
      if (event.key === "ArrowRight") {
        nextId = tablist[(index + 1) % numbTabs];
        if (index === numbTabs - 1) {
          nextId = tablist[0];
        }
        nextId.focus();
        nextId.click();
      }
      if (event.key === "ArrowLeft") {
        nextId = tablist[(index - 1 + numbTabs) % numbTabs];
        if (index === 0) {
          nextId = tablist[numbTabs - 1];
        }
        nextId.focus();
        nextId.click();
      }
    }
  }

  tablist.forEach(function (tab) {
    tab.addEventListener("keydown", tabsHandler);
  });
})();
