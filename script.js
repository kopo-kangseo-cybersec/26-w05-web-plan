document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.querySelector('.nav-toggle-icon').innerHTML = isOpen ? '&#10005;' : '&#9776;';
  });

  // close mobile menu after navigating to a section
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.querySelector('.nav-toggle-icon').innerHTML = '&#9776;';
    });
  });
});
