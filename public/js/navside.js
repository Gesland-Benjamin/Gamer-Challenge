(function() {
  'use strict';

  const toggle = document.querySelector('[data-toggle-nav]');
  const menu = document.querySelector('.navside__menu');
  let isOpen = false;

  if (!toggle || !menu) {
    console.warn('navside: elements not found');
    return;
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    menu.classList.toggle('navside__menu--open', isOpen);
    toggle.classList.toggle('header__burger--open', isOpen);
  });

  document.addEventListener('click', function(e) {
    if (isOpen && !menu.contains(e.target) && !toggle.contains(e.target)) {
      isOpen = false;
      menu.classList.remove('navside__menu--open');
      toggle.classList.remove('header__burger--open');
    }
  });
})();
