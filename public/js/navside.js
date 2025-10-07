const icon = document.querySelector('.menu-burger-icon');
const content = document.querySelector('.navside-content');

icon.addEventListener('click', () => {
  content.classList.toggle('show');
});
