const menuToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('#primary-nav');
const mobileMenuQuery = window.matchMedia('(max-width: 680px)');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  primaryNav.classList.toggle('is-open', isOpen);
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuOpen(!isOpen);
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a') && mobileMenuQuery.matches) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

mobileMenuQuery.addEventListener('change', (event) => {
  if (!event.matches) {
    setMenuOpen(false);
  }
});
