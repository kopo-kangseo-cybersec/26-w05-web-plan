const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

if (header && menuToggle && primaryNavigation) {
  const closeMenu = () => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
  };

  menuToggle.hidden = false;
  document.documentElement.classList.add("js-ready");

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    header.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("menu-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (header.classList.contains("menu-open") && !header.contains(event.target)) {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}