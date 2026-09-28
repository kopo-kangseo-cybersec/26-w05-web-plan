const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const mobileViewport = window.matchMedia("(max-width: 700px)");

if (menuButton && navigation) {
  document.documentElement.classList.add("js");

  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    navigation.classList.toggle("is-open", isOpen);
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest("a[href]");
    if (!link) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (destination.pathname === window.location.pathname && destination.hash) {
      const section = document.querySelector(destination.hash);
      if (section) {
        event.preventDefault();
        window.history.pushState(null, "", destination.hash);
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
    }

    setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  mobileViewport.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenuOpen(false);
    }
  });
}