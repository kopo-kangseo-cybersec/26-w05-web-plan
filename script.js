const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const desktopLayout = window.matchMedia("(min-width: 681px)");

function setMenuOpen(isOpen) {
  siteHeader.classList.toggle("is-menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (!link) return;

  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;

  event.preventDefault();
  setMenuOpen(false);

  if (window.location.hash !== link.hash) {
    window.history.pushState(null, "", link.hash);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

desktopLayout.addEventListener("change", (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});

window.addEventListener("resize", () => {
  if (desktopLayout.matches) {
    setMenuOpen(false);
  }
});