const icon = document.querySelector('.menu-burger-icon');
const content = document.querySelector('.navside-content');

if (icon && content) {
  icon.addEventListener('click', () => {
    content.classList.toggle('show');
  });
}
