const menuButton = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');

if (menuButton && siteNavigation) {
  const closeMenu = (returnFocus = false) => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
    siteNavigation.removeAttribute('data-open');

    if (returnFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      closeMenu();
      return;
    }

    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', '메뉴 닫기');
    siteNavigation.setAttribute('data-open', 'true');
  });

  siteNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });

  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}