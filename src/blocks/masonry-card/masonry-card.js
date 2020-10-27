const icons = document.querySelectorAll('.js-icon')

for (let icon of icons) {
  icon.addEventListener('click', () => {
    icon.classList.toggle('is-active');
  });
}