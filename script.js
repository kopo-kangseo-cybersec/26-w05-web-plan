const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".nav-links");
const siteNavigation = document.querySelector(".site-nav");
const desktopViewport = window.matchMedia("(min-width: 761px)");

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  navigation.classList.toggle("is-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

document.addEventListener("click", (event) => {
  if (!siteNavigation.contains(event.target)) {
    setMenuOpen(false);
  }
});

desktopViewport.addEventListener("change", (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});