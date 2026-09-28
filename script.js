const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

if (menuToggle && navigation) {
  const mobileViewport = window.matchMedia("(max-width: 760px)");

  function setMenuOpen(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    navigation.classList.toggle("is-open", isOpen);
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileViewport.matches) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  mobileViewport.addEventListener("change", (event) => {
    setMenuOpen(false);
    if (!event.matches) {
      navigation.classList.remove("is-open");
    }
  });

  document.documentElement.classList.add("js-ready");
}