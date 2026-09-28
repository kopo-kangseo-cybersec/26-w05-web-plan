const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const mobileLayout = window.matchMedia("(max-width: 680px)");

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  navigation.classList.toggle("is-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && mobileLayout.matches) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

mobileLayout.addEventListener("change", () => setMenuOpen(false));

document.querySelectorAll(".service-link").forEach((link) => {
  const details = document.querySelector(link.getAttribute("href"));

  link.addEventListener("click", (event) => {
    event.preventDefault();
    details.open = !details.open;
    link.setAttribute("aria-expanded", String(details.open));
    link.setAttribute("aria-label", `${details.open ? "접기" : "자세히 보기"}: ${details.querySelector("summary").textContent}`);
    if (details.open) details.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});