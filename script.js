const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#primary-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

const closeMenu = ({ returnFocus = false } = {}) => {
  if (!menuToggle || !navMenu) return;

  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '메뉴 열기');
  navMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');

  if (returnFocus) menuToggle.focus();
};

const openMenu = () => {
  if (!menuToggle || !navMenu) return;

  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', '메뉴 닫기');
  navMenu.classList.add('is-open');
  document.body.classList.add('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetSelector = link.getAttribute('href');
    const targetSection = targetSelector ? document.querySelector(targetSelector) : null;

    if (!targetSection) return;

    event.preventDefault();
    closeMenu();
    window.history.pushState(null, '', targetSelector);
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.addEventListener('click', (event) => {
  if (navMenu?.classList.contains('is-open') && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navMenu?.classList.contains('is-open')) {
    closeMenu({ returnFocus: true });
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 850) closeMenu();
});
